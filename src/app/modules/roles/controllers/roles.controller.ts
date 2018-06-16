import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { DocumentCreatedDto } from '../../common/dtos';
import { RolesService } from '../services';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, RoleType } from '../../common/decorators/roles.decorator';
import { Role } from '../entities';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../dtos';

@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiUseTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) { }

    @ApiOperation({ description: 'Create new role', operationId: 'createRole', title: 'Create new role' })
    @ApiResponse({ status: 201, description: 'Role Created', type: DocumentCreatedDto })
    @ApiBearerAuth()
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRole: CreateRoleDto): Promise<DocumentCreatedDto> {
        return await this.rolesService.create(createRole);
    }

    @ApiOperation({ description: 'Fetch all roles', operationId: 'fetchAllRoles', title: 'Fetch all roles' })
    @ApiResponse({ status: 200, description: 'Roles list', type: Role, isArray: true })
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<RoleDto[]> {
        return await this.rolesService.fetchAll(true);
    }

    @ApiOperation({ description: 'Update role', operationId: 'updateRole', title: 'Update role' })
    @ApiResponse({ status: 200, description: 'Role updated', type: Role })
    @ApiBearerAuth()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateRole: UpdateRoleDto): Promise<Role> {
        return await this.rolesService.update(id, updateRole);
    }

    @ApiOperation({ description: 'Fetch role by Id', operationId: 'fetchRoleById', title: 'Fetch role by Id' })
    @ApiResponse({ status: 200, description: 'Role Found', type: Role })
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<Role> {
        return await this.rolesService.fetchById(id, true);
    }
}
