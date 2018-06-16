import { ESIndex } from '../../common/decorators';
import { Role } from '../../roles/entities';

@ESIndex('users')
export class User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    admin: boolean;
    roles: string[];
    rolesObj: Role[];
    id: string;

    comparePassword? = (password: string) => {
        return this.password === password;
    }

    hasRoles? = (role: string[]) => {
        if (this.rolesObj) {
            return this.rolesObj.some(r => role.indexOf(r.name) >= 0);
        }
        return false;
    }
}