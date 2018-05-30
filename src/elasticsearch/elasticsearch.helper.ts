import 'reflect-metadata';

export let esClient;

export function createClient(hostUri: string) {
    const elasticsearch = require('elasticsearch');

    esClient = new elasticsearch.Client({
        host: hostUri,
    });
}

export function searchQuery<T>(query: any, obj: { new(): T ; }): Promise<any> {
    const idx = getMetadata('Index', obj);

    return esClient.search({
        index: idx,
        body: {
            query,
        },
    });
}

// tslint:disable-next-line:ban-types
export function search<T>(field: string | string[], search: string | string[], obj: { new(): T ; }): Promise<any> {
    const idx = getMetadata('Index', obj);

    // TODO: Need to improve this.
    const match = JSON.parse('{ "' + field + '": "' + search + '" }');

    return esClient.search({
        index: idx,
        body: {
            query: {
                match,
            },
        },
    });
}

function getMetadata<T>(field: string, obj: { new(): T ; }): string {
    return Reflect.getMetadata('Index', new obj().constructor);
}
