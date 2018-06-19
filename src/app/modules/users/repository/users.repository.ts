import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { BaseRepository } from '../../core/repository';
import { User } from '../entities';

/**
 * Users Repository
 *
 * @class UsersRepository
 * @extends {BaseRepository<User>}
 */
@Injectable()
export class UsersRepository extends BaseRepository<User> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, User);
    }
}
