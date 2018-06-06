import 'reflect-metadata';
import { DecoratorTypes } from './elasticsearch.helper';

export function ESType(value: string) {
    return target => {
        Reflect.defineMetadata(DecoratorTypes.Type, value, target);
    };
}

export function ESIndex(value: string) {
    return target => {
        Reflect.defineMetadata(DecoratorTypes.Index, value, target);
    };
}