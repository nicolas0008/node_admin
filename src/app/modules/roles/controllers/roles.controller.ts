import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../dtos';
import { RolesService } from '../services';
import { Role } from '../entities';
import { Roles, RoleType } from '../../../shared/decorators';
import { DocumentCreatedDto } from '../../../shared/dtos';
import { RolesGuard } from '../../../shared/guards';

/**
 * Roles Controller
 *
 * @class RolesController
 */
@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiBearerAuth()
@ApiUseTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) { }

    /**
     * Creates a new role
     *
     * @param {CreateRoleDto} createRole
     * @returns {Promise<DocumentCreatedDto>}
     * @memberof RolesController
     */
    @ApiOperation({ description: 'Create new role', operationId: 'createRole', title: 'Create new role' })
    @ApiResponse({ status: 201, description: 'Role Created', type: DocumentCreatedDto })
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRole: CreateRoleDto): Promise<DocumentCreatedDto> {
        return await this.rolesService.create(createRole);
    }

    /**
     * Returns all roles
     *
     * @returns {Promise<RoleDto[]>}
     * @memberof RolesController
     */
    @ApiOperation({ description: 'Fetch all roles', operationId: 'fetchAllRoles', title: 'Fetch all roles' })
    @ApiResponse({ status: 200, description: 'Roles list', type: Role, isArray: true })
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<RoleDto[]> {
        return await this.rolesService.fetchAll(true);
    }

    /**
     * Updates a role by ID
     *
     * @param {string} id
     * @param {UpdateRoleDto} updateRole
     * @returns {Promise<Role>}
     * @memberof RolesController
     */
    @ApiOperation({ description: 'Update role', operationId: 'updateRole', title: 'Update role' })
    @ApiResponse({ status: 200, description: 'Role updated', type: Role })
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateRole: UpdateRoleDto): Promise<Role> {
        return await this.rolesService.update(id, updateRole);
    }

    /**
     * Returns a role by ID
     *
     * @param {string} id
     * @returns {Promise<Role>}
     * @memberof RolesController
     */
    @ApiOperation({ description: 'Fetch role by Id', operationId: 'fetchRoleById', title: 'Fetch role by Id' })
    @ApiResponse({ status: 200, description: 'Role Found', type: Role })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<Role> {
        return await this.rolesService.fetchById(id, true);
    }
}
