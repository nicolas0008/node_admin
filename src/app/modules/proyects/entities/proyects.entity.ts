import { ESIndex } from '../../common/decorators/es-index.decorator';

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