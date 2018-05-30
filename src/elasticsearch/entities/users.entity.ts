import { Index } from '../elasticsearch.decorators';

@Index('user')
export class Users {
    firstName: string;
    lastName: string;
}