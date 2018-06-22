import { ESIndex } from '../../../shared/decorators';
import { Feature } from '../../features/entities';

/**
 * Role entity
 *
 * @class Role
 */
@ESIndex('roles')
export class Role {
    id: string;
	name: string;
	description: string;
    projectId: string;
    features: string[];
    featuresObj?: Feature[];
}