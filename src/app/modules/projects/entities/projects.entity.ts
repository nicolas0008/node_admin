import { ESIndex } from '../../common/decorators/es-index.decorator';

@ESIndex('projects')
export class Project {
    name: string;
	description: string;
	members: [{
		userId: string;
    }];
	features: [{
        featureId: string;
    }];
}