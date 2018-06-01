import { ESType, ESIndex } from '../elasticsearch.decorators';

@ESIndex('termspace')
@ESType('users')
export class User {
    firstName: string = null;
    lastName: string = null;
    userName: string = null;
    email: string = null;
    password: string = null;
    admin: false = null;
}