import { ReflectMetadata } from '@nestjs/common';

/**
 *
 *
 * @param {string} esIndex Value to save as index
 */
export const ESIndex = (esIndex: string) => ReflectMetadata('ESIndex', esIndex);

/**
 * Helper with string for decorators used in entities
 *
 * @abstract
 * @class DecoratorTypes
 */
export abstract class DecoratorTypes {
    static readonly Index = 'ESIndex';
}