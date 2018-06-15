import { Injectable, ReflectMetadata, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SearchResponse, Client, GetResponse, MGetResponse } from 'elasticsearch';
import * as bodybuilder from 'bodybuilder';

import { ElasticSearchException } from '../../../common/exceptions';
import { DecoratorTypes } from '../../../common/decorators/es-index.decorator';
import { DocumentCreatedDto } from '../../../common/dtos';

@Injectable()
export class ElasticSearchProvider {
    client: Client;

    constructor(private readonly reflector: Reflector) {
        this.initClient('https://elastic:F7pBlVF1OZL39j515vSIlrrF@3fc4d279e6cf43f29ea6239b8a6f370e.sa-east-1.aws.found.io:9243'); // config
    }

    initClient = (hostUri: string) => {
        this.client = new Client({
            host: hostUri
        });
    }

    findAll<T>(instance: { new(): T; }): Promise<T[]> {
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

    find<T>(content: {}, instance: { new(): T; }): Promise<SearchResponse<T>> {
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

    findOne<T>(content: {}, instance: { new(): T; }): Promise<T> {
        return this.find<T>(content, instance).then((resp: SearchResponse<T>) => {
            const response = new instance();
            if (resp.hits.total > 0) {
                Object.assign(response, resp.hits.hits[0]._source, { id: resp.hits.hits[0]._id });
            }
            return response;
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    findById<T>(_id: string, instance: { new(): T; }): Promise<T> {
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

    findByIds<T>(_ids: string[], instance: { new(): T; }): Promise<T[]> {
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

    updateById<T>(updatedObj: T, _id: string, instance: { new(): T; }): Promise<T> {
        return this.client.update({
            index: this.getIndexMetadata(instance),
            type: 'default',
            id: _id,
            body: {
                doc: updatedObj
            }
        }).catch(error => {
            throw new ElasticSearchException(error);
        });
    }

    index<T>(content: any, instance: { new(): T; }): Promise<DocumentCreatedDto> {
        return this.client.index({
            index: this.getIndexMetadata(instance),
            type: 'default',
            body: content
        })
        .then(resp => new DocumentCreatedDto(resp._id))
        .catch(error => { throw new ElasticSearchException(error); });
    }

    private getIndexMetadata<T>(obj: T): string {
        return this.reflector.get<string>(DecoratorTypes.Index, obj);
    }
}
