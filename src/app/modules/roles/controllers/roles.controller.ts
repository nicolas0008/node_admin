import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateRoleDto } from '../dtos';
import { RolesService } from '../services/roles.service';
import { Role } from '../entities/roles.entity';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@ApiUseTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) {}

    // Swagger decorators
    @ApiOperation({ description: 'Create new role', operationId: 'createRole', title: 'Create new role' })
    @ApiResponse({ status: 201, description: 'Role Created' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles('Admin')
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
    @Roles('Admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Role[]> {
        return await this.rolesService.fetchAll();
    }
}
