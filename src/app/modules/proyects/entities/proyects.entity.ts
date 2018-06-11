import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('proyects')
export class Proyect {
    name: string;
	description: string;
	members: [{
		userId: string;
    }];
	features: [{
        featureId: string;
    }];
}