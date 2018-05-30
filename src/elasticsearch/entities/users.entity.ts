import { Index } from '../elasticsearch.decorators';

@Index('users')
export class User {
    firstName: string;
    lastName: string;
}