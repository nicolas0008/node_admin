import { Injectable } from '@nestjs/common';

import * as ESHelper from '../elasticsearch/elasticsearch.helper';
import { User } from '../elasticsearch/entities/users.entity';

@Injectable()
export class UsersService {
    async create(user: User) {
        return ESHelper.index(user, User);
    }

    async get() {
        return ESHelper.search({ firstName: 'FirstName' }, User);
    }
}
