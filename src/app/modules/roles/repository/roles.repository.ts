import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { BaseRepository } from '../../core/repository';
import { Role } from '../entities';

/**
 * Roles repository
 *
 * @class RolesRepository
 * @extends {BaseRepository<Role>}
 */
@Injectable()
export class RolesRepository extends BaseRepository<Role> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Role);
    }
}
