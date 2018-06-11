import { ESIndex } from '../../core/database/elasticsearch/elasticsearch.provider';

@ESIndex('users')
export class User {
    firstName?: string;
    lastName?: string;
    userName: string;
    email: string;
    password: string;
    admin?: boolean;
    roles?: string[];
    id?: string;

    comparePassword = (password: string) => {
        return this.password === password;
    }
}