import { ESIndex } from '../../common/decorators/es-index.decorator';
import { Role } from '../../roles/entities/roles.entity';

@ESIndex('users')
export class User {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    admin?: boolean;
    roles?: string[];
    rolesObj?: Role[];
    id?: string;

    comparePassword = (password: string) => {
        return this.password === password;
    }
}