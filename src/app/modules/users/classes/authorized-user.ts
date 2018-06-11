import { User } from '../entities/users.entity';

export class AuthorizedUser {
    identity: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(user: User) {
        this.identity = user.identity;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
