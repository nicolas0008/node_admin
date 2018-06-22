import { Injectable } from '@nestjs/common';

import { RolesRepository } from '../repository';
import { FeaturesService } from '../../features/services';
import { Role } from '../entities';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../dtos';
import { DocumentCreatedDto } from '../../../shared/dtos';

@Injectable()
export class RolesService {
    constructor(
        private readonly rolesRepository: RolesRepository,
        private readonly featuresService: FeaturesService
    ) { }

    /**
     * Creates a new role
     *
     * @param {CreateRoleDto} createRoleDto - Object with the role to create
     * @returns {Promise<DocumentCreatedDto>} - Promise of the response with the document created
     * @memberof RolesService
     */
    async create(createRoleDto: CreateRoleDto): Promise<DocumentCreatedDto> {
        return await this.rolesRepository.index(createRoleDto);
    }

    /**
     * Gets all the roles
     *
     * @param {boolean} [fetchFeatures=false] - Fetch internal features from roles
     * @returns {Promise<RoleDto[]>} - Promise of the array of roles
     * @memberof RolesService
     */
    async fetchAll(fetchFeatures: boolean = false): Promise<RoleDto[]> {
        const roles = await this.rolesRepository.fetchAll();
        if (fetchFeatures) {
            for (let role of roles) {
                role = await this.getFeatures(role);
            }
        }
        return roles;
    }

    /**
     * Gets a role by ID
     *
     * @param {string} id - Id to find
     * @param {boolean} [fetchFeatures=false] - Get the related features
     * @returns {Promise<RoleDto[]>} Promise of an array with the roles
     * @memberof RolesService
     */
    async fetchById(id: string, fetchFeatures: boolean = false): Promise<RoleDto> {
        let role = await this.rolesRepository.fetchById(id);
        if (fetchFeatures) {
            role = await this.getFeatures(role);
        }
        return role;
    }

    /**
     * Gets a set of roles by ID's
     *
     * @param {string[]} roleIds - Ids to find
     * @param {boolean} [fetchFeatures=false] - Get the related features
     * @returns {Promise<RoleDto[]>} - Promise of an array with the roles
     * @memberof RolesService
     */
    async fetchByIds(roleIds: string[], fetchFeatures: boolean = false): Promise<RoleDto[]> {
        const roles = await this.rolesRepository.fetchByIds(roleIds);
        if (fetchFeatures) {
            for (let role of roles) {
                role = await this.getFeatures(role);
            }
        }
        return roles;
    }

    /**
     * Updates a role by ID
     *
     * @param {string} id - Id to update
     * @param {UpdateRoleDto} updateRoleDto - Object with the updated role
     * @returns {Promise<RoleDto>} - Promise of the updated role
     * @memberof RolesService
     */
    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
        const updatedRole = new Role();
        Object.assign(updatedRole, updateRoleDto);
        return await this.rolesRepository.updateById(id, updatedRole);
    }

    /**
     * Get the features related
     *
     * @param {Role} role - Role to find its related features
     * @returns {Promise<RoleDto>} - Promise of the role updated
     * @memberof RolesService
     */
    async getFeatures(role: Role): Promise<RoleDto> {
        if (role.features && role.features.length > 0) {
            role.featuresObj = await this.featuresService.fetchByIds(role.features);
        }
        return role;
    }
}
