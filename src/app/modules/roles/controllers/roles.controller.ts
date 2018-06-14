import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateRoleDto, UpdateRoleDto } from '../';
import { RolesService } from '../services/roles.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, RoleType } from '../../common/decorators/roles.decorator';
import { Role } from '../entities/roles.entity';

@ApiUseTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) { }

    // Swagger decorators
    @ApiOperation({ description: 'Create new role', operationId: 'createRole', title: 'Create new role' })
    @ApiResponse({ status: 201, description: 'Role Created' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return await this.rolesService.create(createRoleDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find all roles', operationId: 'findAllRoles', title: 'Find all roles' })
    @ApiResponse({ status: 200, description: 'Roles list' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Role[]> {
        return await this.rolesService.fetchAll(true);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Update role', operationId: 'updateRole', title: 'Update role' })
    @ApiResponse({ status: 200, description: 'Role updated' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
        return await this.rolesService.update(id, updateRoleDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find role by Id', operationId: 'findRoleById', title: 'Find role by Id' })
    @ApiResponse({ status: 200, description: 'Role Found' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async find(@Param('id') id: string): Promise<Role> {
        return await this.rolesService.fetchById(id, true);
    }
}
