import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SearchResponse, Client, GetResponse, MGetResponse } from 'elasticsearch';
import * as bodybuilder from 'bodybuilder';

import { ElasticSearchException } from '../../../shared/exceptions';
import { DecoratorTypes } from '../../../shared/decorators';
import { DocumentCreatedDto } from '../../../shared/dtos';

/**
 * Common elastic search provider helper
 *
 * @class ElasticSearchProvider
 */
@Injectable()
export class ElasticSearchProvider {
    client: Client;

    constructor(private readonly reflector: Reflector) {
        this.initClient('https://elastic:F7pBlVF1OZL39j515vSIlrrF@3fc4d279e6cf43f29ea6239b8a6f370e.sa-east-1.aws.found.io:9243'); // config
    }

    /**
     * Initializes the elastic search client
     *
     * @memberof ElasticSearchProvider
     */
    initClient = (hostUri: string) => {
        this.client = new Client({
            host: hostUri
        });
    }

    /**
     * Gets all the documents
     *
     * @returns {Promise<T[]>} - Promise of an array of objects of the type specified
     * @param {Type} instance - Type of the document
     * @memberof BaseRepository
     */
    fetchAll<T>(instance: { new(): T; }): Promise<T[]> {
        return this.client.search<T>({
            index: this.getIndexMetadata(instance),
            type: 'default'
        }).then((resp: SearchResponse<T>) => {
            const arr = new Array<T>();
            resp.hits.hits.forEach(obj => {
                const aux = new instance();
                Object.assign(aux, obj._source, { id: obj._id });
                arr.push(aux);
            });
            return arr;
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    /**
     * Gets documents according to a search
     *
     * @param {*} content - Object with matching parameters
     * @param {Type} instance - Type of the document
     * @returns {Promise<SearchResponse<T>>} - Promise of an object of the type specified, encapsulated in a elasticsearch.SearchResponse object
     * @memberof BaseRepository
     */
    fetch<T>(content: {}, instance: { new(): T; }): Promise<SearchResponse<T>> {
        const build = bodybuilder();
        for (const prop in content) {
            if (content.hasOwnProperty(prop)) {
                build.query('match', prop, content[prop]);
            }
        }

        return this.client.search<T>({
            index: this.getIndexMetadata(instance),
            type: 'default',
            body: build.build()
        });
    }

    /**
     * Gets a document according to a search
     *
     * @param {*} content - Object with matching parameters
     * @param {Type} instance - Type of the document
     * @returns {Promise<T>} - Promise of an object of the type specified
     * @memberof BaseRepository
     */
    fetchOne<T>(content: {}, instance: { new(): T; }): Promise<T> {
        return this.fetch<T>(content, instance).then((resp: SearchResponse<T>) => {
            const response = new instance();
            if (resp.hits.total > 0) {
                Object.assign(response, resp.hits.hits[0]._source, { id: resp.hits.hits[0]._id });
            }
            return response;
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    /**
     * Gets a document by ID
     *
     * @param {string} _id - ID of the searched document
     * @param {Type} instance - Type of the document
     * @returns {Promise<T>} - Promise of an object of the type specified
     * @memberof BaseRepository
     */
    fetchById<T>(_id: string, instance: { new(): T; }): Promise<T> {
        return this.client.get<T>({
            index: this.getIndexMetadata(instance),
            type: 'default',
            id: _id
        }).then((resp: GetResponse<T>) => {
            const response = new instance();
            Object.assign(response, resp._source, { id: resp._id });
            return response;
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    /**
     * Gets a set of documents by ID's
     *
     * @param {string} _ids - ID's of the searched document
     * @param {Type} instance - Type of the document
     * @returns {Promise<T>} - Promise of an array of objects of the type specified
     * @memberof BaseRepository
     */
    fetchByIds<T>(_ids: string[], instance: { new(): T; }): Promise<T[]> {
        return this.client.mget<T>({
            index: this.getIndexMetadata(instance),
            type: 'default',
            body: {
                ids : _ids
            }
        }).then((resp: MGetResponse<T>) => {
            const arr = new Array<T>();
            resp.docs.forEach(obj => {
                const aux = new instance();
                Object.assign(aux, obj._source, { id: obj._id });
                arr.push(aux);
            });
            return arr;
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    /**
     *  Updates a document by ID
     *
     * @param {T} updatedEntity Document to update
     * @param {string} i ID of the document to update
     * @param {Type} instance - Type of the document
     * @returns
     * @memberof BaseRepository
     */
    updateById<T>(updatedEntity: T, _id: string, instance: { new(): T; }): Promise<T> {
        return this.client.update({
            index: this.getIndexMetadata(instance),
            type: 'default',
            id: _id,
            body: {
                doc: updatedEntity
            }
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    /**
     * Indexes a new document
     *
     * @param {*} dto DTO to index a new document
     * @param {Type} instance - Type of the document
     * @returns {Promise<DocumentCreatedDto>} Promise of the response with the document created
     * @memberof BaseRepository
     */
    index<T>(dto: any, instance: { new(): T; }): Promise<DocumentCreatedDto> {
        return this.client.index({
            index: this.getIndexMetadata(instance),
            type: 'default',
            body: dto
        })
        .then(resp => new DocumentCreatedDto(resp._id))
        .catch(error => { throw new ElasticSearchException(error); });
    }

    /**
     * Reflects the metadata that loads the index from the entity
     *
     * @private
     * @param {Type} obj Type of the entity to get the index
     * @returns {string}
     * @memberof ElasticSearchProvider
     */
    private getIndexMetadata<T>(obj: T): string {
        return this.reflector.get<string>(DecoratorTypes.Index, obj);
    }
}
