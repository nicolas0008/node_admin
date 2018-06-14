import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, UpdateUserDto } from '../';
import { UsersService } from '../services/users.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, RoleType } from '../../common/decorators/roles.decorator';
import { User } from '../entities/users.entity';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    // Swagger decorators
    @ApiOperation({ description: 'Create new user', operationId: 'createUser', title: 'Create new user' })
    @ApiResponse({ status: 201, description: 'User Created' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<{ id: string }> {
        return await this.usersService.create(createUserDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find all users', operationId: 'findAllUsers', title: 'Find all users' })
    @ApiResponse({ status: 200, description: 'Users list' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<User[]> {
        return await this.usersService.fetchAll(true);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Update user', operationId: 'updateUser', title: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.update(id, updateUserDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find user by Id', operationId: 'findUserById', title: 'Find user by Id' })
    @ApiResponse({ status: 200, description: 'User Found' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get('findOne:id')
    @HttpCode(HttpStatus.OK)
    async find(@Param('id') id: string): Promise<User> {
        return await this.usersService.fetchById(id, true);
    }
}
