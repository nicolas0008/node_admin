import { Injectable } from '@nestjs/common';

import { SearchResponse } from 'elasticsearch';
import { ElasticSearchProvider } from '../../core';
import { CreateUserDto, UpdateUserDto } from '../';
import { BaseRepository } from '../../core/repository/base.repository';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, User);
    }
}
