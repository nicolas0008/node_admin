import 'reflect-metadata';

export let esClient;

export function createClient(hostUri: string) {
    const elasticsearch = require('elasticsearch');

    esClient = new elasticsearch.Client({
        host: hostUri,
    });
}

export function searchQuery<T>(query: any, typeName: { new(): T; } | string): Promise<any> {
    const typ = typeof typeName === 'string' ? typeName : getMetadata('Index', typeName);

    return esClient.search({
        index: 'termspace',
        type: typ,
        body: {
            query,
        },
    });
}

// tslint:disable-next-line:ban-types
export function search<T>(content: T, typeName: { new(): T; } | string): Promise<any> {
    const typ = typeof typeName === 'string' ? typeName : getMetadata('Index', typeName);
    const str = JSON.parse(JSON.stringify(content));

    return esClient.search({
        index: 'termspace',
        type: typ,
        body: {
            query: {
                match: str,
            },
        },
    });
}

export function index<T>(content: any, typeName: { new(): T; } | string) {
    const typ = typeof typeName === 'string' ? typeName : getMetadata('Index', typeName);
    const str = JSON.stringify(content);

    return esClient.index({
        index: 'termspace',
        type: typ,
        body: str,
    });
}

function getMetadata<T>(field: string, obj: { new(): T; }): string {
    return Reflect.getMetadata('Index', new obj().constructor);
}
