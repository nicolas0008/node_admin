import { ESIndex } from '../../../shared/decorators';
import { User } from '../../users/entities';
import { Feature } from '../../features/entities';

/**
 * Project entity
 *
 * @class Project
 */
@ESIndex('projects')
export class Project {
    name: string;
	description: string;
	users: string[];
    usersObj?: User[];
	features: string[];
    featuresObj?: Feature[];
}