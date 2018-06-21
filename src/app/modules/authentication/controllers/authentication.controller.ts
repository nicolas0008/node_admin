import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { UsersService } from '../../users/services';
import { AuthenticationService } from '../services';
import { DocumentCreatedDto } from '../../../shared/dtos';
import { CreateUserDto } from '../../users/dtos';
import { UserLoginDto } from '../dtos';
import { JWTToken } from '../interfaces';

/**
 * Authentication controller
 *
 * @class AuthenticationController
 */
@ApiUseTags('Auth')
@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService
    ) { }

    /**
     * Endpoint to create a new user
     *
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<DocumentCreatedDto>}
     * @memberof AuthenticationController
     */
    @ApiOperation({ description: 'Sign Up', operationId: 'signup', title: 'Sign Up' })
    @ApiResponse({ status: 200, description: 'User Created', type: DocumentCreatedDto })
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<DocumentCreatedDto> {
        return await this.usersService.create(createUserDto);
    }

    /**
     * Endpoint to login
     *
     * @param {UserLoginDto} userCredentials
     * @returns {Promise<JWTToken>}
     * @memberof AuthenticationController
     */
    @ApiOperation({ description: 'Login', operationId: 'login', title: 'Login' })
    @ApiResponse({ status: 200, description: 'Login Successful', type: JWTToken })
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userCredentials: UserLoginDto): Promise<JWTToken> {
        return await this.authenticationService.login(userCredentials);
    }
}
