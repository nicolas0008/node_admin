import { ESIndex } from '../../common/decorators/es-index.decorator';
import { User } from '../../users/entities/users.entity';
import { Feature } from '../../features/entities/features.entity';

@ESIndex('projects')
export class Project {
    name: string;
	description: string;
	users: string[];
    usersObj?: User[];
	features: string[];
    featuresObj?: Feature[];
}