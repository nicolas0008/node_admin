import { ESIndex } from '../../common/decorators';
import { Feature } from '../../features/entities';

@ESIndex('roles')
export class Role {
    id: string;
	name: string;
	description: string;
    projectId: string;
    features: string[];
    featuresObj?: Feature[];
}