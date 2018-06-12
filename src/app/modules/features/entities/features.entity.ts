import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('features')
export class Feature {
    id: string;
    name: string;
    description: string;
}