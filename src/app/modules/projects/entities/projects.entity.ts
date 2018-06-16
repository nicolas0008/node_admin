import { ESIndex } from '../../common/decorators';
import { User } from '../../users/entities';
import { Feature } from '../../features/entities';

@ESIndex('projects')
export class Project {
    name: string;
	description: string;
	users: string[];
    usersObj?: User[];
	features: string[];
    featuresObj?: Feature[];
}