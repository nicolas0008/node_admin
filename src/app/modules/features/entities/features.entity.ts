import { ESIndex } from '../../common/decorators/es-index.decorator';

@ESIndex('features')
export class Feature {
    id: string;
    name: string;
    description: string;
}