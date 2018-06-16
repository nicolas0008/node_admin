import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { BaseRepository } from '../../core/repository/base.repository';
import { Role } from '../entities';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Role);
    }
}
