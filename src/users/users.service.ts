import { Injectable } from '@nestjs/common';

import * as ESHelper from '../database/elasticsearch.helper';
import { User } from '../database/entities/users.entity';

@Injectable()
export class UsersService {
    async create(user: User) {
        return ESHelper.index(user, User);
    }

    async get() {
        return ESHelper.search({ firstName: 'FirstName' }, User);
    }
}
