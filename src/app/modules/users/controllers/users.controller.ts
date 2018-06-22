import { Controller, Post, HttpStatus, HttpCode, Body, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos';
import { UsersService } from '../services';
import { Roles, RoleType } from '../../../shared/decorators';
import { DocumentCreatedDto } from '../../../shared/dtos';
import { RolesGuard } from '../../../shared/guards';

/**
 * Users Controller
 *
 * @class UsersController
 */
@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    /**
     * Create a new user
     *
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<DocumentCreatedDto>}
     * @memberof UsersController
     */
    @ApiOperation({ description: 'Create new user', operationId: 'createUser', title: 'Create new user' })
    @ApiResponse({ status: 201, description: 'User Created', type: DocumentCreatedDto })
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<DocumentCreatedDto> {
        return await this.usersService.create(createUserDto);
    }

    /**
     * Returns all users
     *
     * @returns {Promise<UserDto[]>}
     * @memberof UsersController
     */
    @ApiOperation({ description: 'Fetch all users', operationId: 'fetchAllUsers', title: 'Fetch all users' })
    @ApiResponse({ status: 200, description: 'Users list', type: UserDto, isArray: true })
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<UserDto[]> {
        return await this.usersService.fetchAll(true);
    }

    /**
     * Updates an user by ID
     *
     * @param {string} id
     * @param {UpdateUserDto} updateUserDto
     * @returns {Promise<UserDto>}
     * @memberof UsersController
     */
    @ApiOperation({ description: 'Update user', operationId: 'updateUser', title: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated', type: UserDto })
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
        return await this.usersService.update(id, updateUserDto);
    }

    /**
     * Returns an user by ID
     *
     * @param {string} id
     * @returns {Promise<UserDto>}
     * @memberof UsersController
     */
    @ApiOperation({ description: 'Fetch user by Id', operationId: 'fetchUserById', title: 'Fetch user by Id' })
    @ApiResponse({ status: 200, description: 'User Found', type: UserDto })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<UserDto> {
        return await this.usersService.fetchById(id, true);
    }
}
