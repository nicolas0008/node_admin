import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('users')
export class User {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    admin?: boolean;
    identity?: string;

    comparePassword? = (password: string) => {
        return this.password === password;
    }

    fromUntypedUser(untypedUser: {
        firstName?: string;
        lastName?: string;
        userName: string;
        email: string;
        password: string;
        admin?: boolean;
        identity?: string;
    }) {
        this.firstName = untypedUser.firstName;
        this.lastName = untypedUser.lastName;
        this.userName = untypedUser.userName;
        this.email = untypedUser.email;
        this.password = untypedUser.password;
        this.admin = untypedUser.admin;
        this.identity = untypedUser.identity;
    }
}