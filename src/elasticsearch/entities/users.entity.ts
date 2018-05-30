import { Type } from '../elasticsearch.decorators';

@Type('users')
export class User {
    firstName: string;
    lastName: string;
}