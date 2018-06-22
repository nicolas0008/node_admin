import { ESIndex } from '../../../shared/decorators';

@ESIndex('features')
export class Feature {
    id: string;
    name: string;
    description: string;
}