import 'reflect-metadata';
import { BaseRepoEntity } from './entities/base-repo.entity';

export let esClient: ESClient;

export function initClient(hostUri: string): ESClient {
    esClient = createClient(hostUri);
    return esClient;
}

export function createClient(hostUri: string): ESClient {
    const elasticsearch = require('elasticsearch');
    const client = new ESClient();
    client.esClient = new elasticsearch.Client({
        host: hostUri
    });
    return client;
}

export class DecoratorTypes {
    static readonly Type = 'ESType';
    static readonly Index = 'ESIndex';
}

export class ESClient {
    esClient: any;

    search<T>(content: any, typeName: { new(): T; }): Promise<BaseRepoEntity<T>> {
        const str = JSON.parse(JSON.stringify(content));

        return this.esClient.search({
            index: this.getIndexMetadata(typeName),
            type: this.getTypeMetadata(typeName),
            body: {
                query: {
                    match: str
                }
            }
        });
    }

    index<T>(content: any, typeName: { new(): T; }) {
        const str = JSON.stringify(content);

        return this.esClient.index({
            index: this.getIndexMetadata(typeName),
            type: this.getTypeMetadata(typeName),
            body: str
        });
    }

    getTypeMetadata<T>(obj: { new(): T; }): string {
        return this.getMetadata(DecoratorTypes.Type, obj);
    }

    getIndexMetadata<T>(obj: { new(): T; }): string {
        return this.getMetadata(DecoratorTypes.Index, obj);
    }

    getMetadata<T>(str: string, obj: { new(): T; }): string {
        return Reflect.getMetadata(str, new obj().constructor);
    }
}
