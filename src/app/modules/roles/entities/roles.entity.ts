import { ESIndex } from '../../common/decorators/es-index.decorator';
import { Feature } from '../../features/entities/features.entity';

@ESIndex('roles')
export class Role {
    id: string;
	name: string;
	description: string;
    projectId: string;
    features: string[];
    featuresObj?: Feature[];
}