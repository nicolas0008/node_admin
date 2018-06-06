import { Injectable } from '@nestjs/common';

import { esClient } from '../../database/elasticsearch.helper';
import { User } from '../../database/entities/users.entity';
import { BaseRepoEntity } from 'database/entities/base-repo.entity';

@Injectable()
export class UsersRepository {
    async index(user: User) {
        return esClient.index(user, User);
    }

    async findOne(content: any): Promise<User> {
        return esClient.findOne(content, User);
    }

    async findById(id: string): Promise<User> {
        return esClient.findById(id, User);
    }
}
