import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../../shared/database/elasticsearch';
import { BaseRepository } from '../../../shared/repository';
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
