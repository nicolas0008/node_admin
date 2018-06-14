import { Role } from '../../roles/entities/roles.entity';
import { User } from '../entities/users.entity';

export class AuthorizedUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    rolesObj: Role[];

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.rolesObj = user.rolesObj;
    }

    hasRoles = (role: string[]) => {
        if (this.rolesObj) {
            return this.rolesObj.some(r => role.indexOf(r.name) >= 0);
        }
        return false;
    }
}
