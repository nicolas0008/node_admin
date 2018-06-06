import { ESIndex } from '../elasticsearch.decorators';

@ESIndex('users')
export class User {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    admin?: boolean;
    _id: string;
}