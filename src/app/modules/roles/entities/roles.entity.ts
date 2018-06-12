import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('roles')
export class Role {
    id: string;
	name: string;
	description: string;
    projectId: string;
	features: [{
        featureId: string;
    }];
}