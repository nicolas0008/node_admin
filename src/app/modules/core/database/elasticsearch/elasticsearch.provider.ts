import { Injectable, ReflectMetadata } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import * as bodybuilder from 'bodybuilder';

@Injectable()
export class ElasticSearchProvider {
    client: elasticsearch.Client;

    constructor() {
        this.initClient('https://elastic:F7pBlVF1OZL39j515vSIlrrF@3fc4d279e6cf43f29ea6239b8a6f370e.sa-east-1.aws.found.io:9243'); // config
    }

    initClient = (hostUri: string) => {
        this.client = new elasticsearch.Client({
            host: hostUri
        });
    }

    searchAll<T>(typeName: { new(): T; }): Promise<elasticsearch.SearchResponse<T>> {
        return this.client.search<T>({
            index: this.getIndexMetadata(typeName),
            type: 'default'
        });
    }

    search<T>(content: {}, typeName: { new(): T; }): Promise<elasticsearch.SearchResponse<T>> {
        const str = JSON.parse(JSON.stringify(content));
        const build = bodybuilder();
        for (const prop in content) {
            if (content.hasOwnProperty(prop)) {
                build.query('match', prop, content[prop]);
            }
        }

        return this.client.search<T>({
            index: this.getIndexMetadata(typeName),
            type: 'default',
            body: build.build()
        });
    }

    searchOne<T>(content: {}, typeName: { new(): T; }): Promise<T> {
        return this.search<T>(content, typeName).then((resp: elasticsearch.SearchResponse<T>) => {
            const response = new typeName();
            if (resp.hits.total > 0) {
                Object.assign(response, resp.hits.hits[0]._source, { id: resp.hits.hits[0]._id });
            }
            return response;
        });
    }

    searchById<T>(_id: string, typeName: { new(): T; }): Promise<T> {
        return this.client.get<T>({
            index: this.getIndexMetadata(typeName),
            type: 'default',
            id: _id
        }).then((resp: elasticsearch.GetResponse<T>) => {
            const response = new typeName();
            Object.assign(response, resp._source, { id: resp._id });
            return response;
        });
    }

    index<T>(content: any, typeName: { new(): T; }) {
        const str = JSON.stringify(content);

        return this.client.index({
            index: this.getIndexMetadata(typeName),
            type: 'default',
            body: str
        });
    }

    private getIndexMetadata<T>(obj: { new(): T; }): string {
        return this.getMetadata(DecoratorTypes.Index, obj);
    }

    private getMetadata<T>(str: string, obj: { new(): T; }): string {
        return Reflect.getMetadata(str, new obj().constructor);
    }
}

export class DecoratorTypes {
    static readonly Index = 'ESIndex';
}

export function ESIndex(value: string) {
    return target => {
        Reflect.defineMetadata(DecoratorTypes.Index, value, target);
    };
}
