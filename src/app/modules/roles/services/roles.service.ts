import { Injectable } from '@nestjs/common';

import { RolesRepository } from '../repository';
import { FeaturesService } from '../../features/services';
import { Role } from '../entities';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../dtos';
import { DocumentCreatedDto } from '../../common/dtos';

@Injectable()
export class RolesService {
    constructor(
        private readonly rolesRepository: RolesRepository,
        private readonly featuresService: FeaturesService
    ) { }

    async create(createRoleDto: CreateRoleDto): Promise<DocumentCreatedDto> {
        return await this.rolesRepository.index(createRoleDto);
    }

    async fetchAll(fetchFeatures = false): Promise<RoleDto[]> {
        const roles = await this.rolesRepository.fetchAll();
        if (fetchFeatures) {
            for (let role of roles) {
                role = await this.getFeatures(role);
            }
        }
        return roles;
    }

    async fetchById(id: string, fetchFeatures = false): Promise<RoleDto> {
        let role = await this.rolesRepository.fetchById(id);
        if (fetchFeatures) {
            role = await this.getFeatures(role);
        }
        return role;
    }

    async fetchByIds(roleIds: string[], fetchFeatures = false): Promise<RoleDto[]> {
        const roles = await this.rolesRepository.fetchByIds(roleIds);
        if (fetchFeatures) {
            for (let role of roles) {
                role = await this.getFeatures(role);
            }
        }
        return roles;
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
        const updatedRole = new Role();
        Object.assign(updatedRole, updateRoleDto);
        return await this.rolesRepository.updateById(id, updatedRole);
    }

    async getFeatures(role: Role): Promise<RoleDto>{
        if (role.features && role.features.length > 0) {
            role.featuresObj = await this.featuresService.fetchByIds(role.features);
        }
        return role;
    }
}
