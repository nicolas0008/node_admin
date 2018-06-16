import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos';
import { UsersService } from '../services';
import { User } from '../entities';
import { Roles, RoleType } from '../../common/decorators';
import { DocumentCreatedDto } from '../../common/dtos';
import { RolesGuard } from '../../common/guards';

@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({ description: 'Create new user', operationId: 'createUser', title: 'Create new user' })
    @ApiResponse({ status: 201, description: 'User Created', type: DocumentCreatedDto })
    @ApiBearerAuth()
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<DocumentCreatedDto> {
        return await this.usersService.create(createUserDto);
    }

    @ApiOperation({ description: 'Fetch all users', operationId: 'fetchAllUsers', title: 'Fetch all users' })
    @ApiResponse({ status: 200, description: 'Users list', type: UserDto, isArray: true })
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<UserDto[]> {
        return await this.usersService.fetchAll(true);
    }

    @ApiOperation({ description: 'Update user', operationId: 'updateUser', title: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated', type: UserDto })
    @ApiBearerAuth()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
        return await this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ description: 'Fetch user by Id', operationId: 'fetchUserById', title: 'Fetch user by Id' })
    @ApiResponse({ status: 200, description: 'User Found', type: UserDto })
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<UserDto> {
        return await this.usersService.fetchById(id, true);
    }
}
