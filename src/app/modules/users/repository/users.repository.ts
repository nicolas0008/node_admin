import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch/elasticsearch.provider';
import { CreateUserDto } from '../dtos';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) { }

    async index(userDto: CreateUserDto) {
        return this.elasticSearchProvider.index(userDto, User);
    }

    async findOne(content: any): Promise<User> {
        return this.elasticSearchProvider.searchOne(content, User);
    }

    async findById(id: string): Promise<User> {
        return this.elasticSearchProvider.searchById<User>(id, User);
    }
}
