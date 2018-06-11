import { User } from '../entities/users.entity';

export class AuthorizedUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.roles = user.roles;
    }

    hasRoles = (role: string[]) => {
        if (this.roles) {
            return this.roles.some(r => role.indexOf(r) >= 0);
        }
        return false;
    }
}
