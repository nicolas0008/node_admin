import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core';
import { BaseRepository } from '../../core/repository/base.repository';
import { CreateRoleDto } from '../';
import { Role } from '../entities/roles.entity';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Role);
    }
}
