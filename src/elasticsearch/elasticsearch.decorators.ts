import 'reflect-metadata';

export function Index(value: string) {
    // tslint:disable-next-line:only-arrow-functions ban-types
    return function(target: Function) {
        Reflect.defineMetadata('Index', value, target);
    };
}