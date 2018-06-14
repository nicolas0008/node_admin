import { Injectable } from '@nestjs/common';

import { FeaturesService } from '../../features/services/features.service';
import { RolesRepository } from '../repository/roles.repository';
import { CreateRoleDto, UpdateRoleDto } from '../';
import { Role } from '../entities/roles.entity';

@Injectable()
export class RolesService {
    constructor(
        private readonly rolesRepository: RolesRepository,
        private readonly featuresService: FeaturesService
    ) { }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const roles = await this.rolesRepository.index(createRoleDto);
        return roles;
    }

    async fetchAll(fetchFeatures = false): Promise<Role[]> {
        const roles = await this.rolesRepository.findAll();
        if (fetchFeatures) {
            for (let role of roles) {
                role = await this.getFeatures(role);
            }
        }
        return roles;
    }

    async fetchById(id: string, fetchFeatures = false): Promise<Role> {
        let role = await this.rolesRepository.findById(id);
        if (fetchFeatures) {
            role = await this.getFeatures(role);
        }
        return role;
    }

    async fetchByIds(roleIds: string[], fetchFeatures = false): Promise<Role[]> {
        const roles = await this.rolesRepository.findByIds(roleIds);
        if (fetchFeatures) {
            roles.forEach(role => this.getFeatures(role));
        }
        return roles;
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const updatedRole = new Role();
        Object.assign(updatedRole, updateRoleDto);
        return await this.rolesRepository.updateById(id, updatedRole);
    }

    async getFeatures(role: Role): Promise<Role>{
        if (role.features.length > 0) {
            role.featuresObj = await this.featuresService.fetchByIds(role.features);
        }
        return role;
    }
}
