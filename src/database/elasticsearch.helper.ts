import 'reflect-metadata';
import { BaseRepoEntity } from './entities/base-repo.entity';

export let esClient: ESClient;
export let bodybuilder: any;

export function initClient(hostUri: string): ESClient {
    return createClient(hostUri);
}

export function createClient(hostUri: string): ESClient {
    const elasticsearch = require('elasticsearch');
    bodybuilder = require('bodybuilder');
    const client = new ESClient();
    client.client = new elasticsearch.Client({
        host: hostUri
    });
    return client;
}

export class DecoratorTypes {
    static readonly Index = 'ESIndex';
}

export class ESClient {
    client: any;

    find<T>(content: {}, typeName: { new(): T; }): Promise<BaseRepoEntity<T>> {
        const str = JSON.parse(JSON.stringify(content));
        const build = bodybuilder();
        for (const prop in content) {
            if (content.hasOwnProperty(prop)) {
                build.query('match', prop, content[prop]);
            }
        }

        return this.client.search({
            index: this.getIndexMetadata(typeName),
            type: 'default',
            body: build.build()
        });
    }

    findOne<T>(content: {}, typeName: { new(): T; }): Promise<T> {
        return this.find(content, typeName).then((baseEntity) => {
            return (baseEntity.hits.hits.length > 0) ? baseEntity.hits.hits[0]._source : null;
        });
    }

    findById<T>(_id: string, typeName: { new(): T; }): Promise<T> {
        return this.client.get({
            index: this.getIndexMetadata(typeName),
            type: 'default',
            id: _id
        }).then((baseEntity: BaseRepoEntity<T>) => {
            return (baseEntity.hits.hits.length > 0) ? baseEntity.hits.hits[0]._source : null;
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
