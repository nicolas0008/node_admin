import { ESIndex } from '../../common/decorators';

@ESIndex('features')
export class Feature {
    id: string;
    name: string;
    description: string;
}