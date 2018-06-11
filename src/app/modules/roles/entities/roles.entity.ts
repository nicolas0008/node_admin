import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('roles')
export class Role {
	name: string;
	description: string;
    projectId: string;
	features: [{
        featureId: string;
    }];
}