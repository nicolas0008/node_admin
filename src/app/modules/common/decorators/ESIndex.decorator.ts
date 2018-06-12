import { ReflectMetadata } from '@nestjs/common';

export const ESIndex = (...esIndex: string[]) => ReflectMetadata('ESIndex', esIndex);

export abstract class DecoratorTypes {
    static readonly Index = 'ESIndex';
}