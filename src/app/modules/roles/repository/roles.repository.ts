import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch/elasticsearch.provider';
import { CreateRoleDto } from '../dtos';
import { Role } from '../entities/roles.entity';
import { SearchResponse } from 'elasticsearch';

@Injectable()
export class RolesRepository {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) { }

    async index(roleDto: CreateRoleDto) {
        return this.elasticSearchProvider.index(roleDto, Role);
    }

    async findAll(): Promise<Role[]> {
        return this.elasticSearchProvider.searchAll(Role).then((resp: SearchResponse<Role>) => {
            const roleArr = new Array<Role>();
            resp.hits.hits.forEach(feature => {
                const roleAux = new Role();
                Object.assign(roleAux, feature._source, { id: feature._id });
                roleArr.push(roleAux);
            });
            return roleArr;
        });
    }
}
