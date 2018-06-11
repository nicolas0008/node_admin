import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('features')
export class Feature {
    name: string;
    description: string;
}