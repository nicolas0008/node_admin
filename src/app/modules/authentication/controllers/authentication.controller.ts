import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { UserLoginDto, JWTToken, CreateUserDto } from '../../';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../../users/services/users.service';
import { DocumentCreatedDto } from '../../common/dtos';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService
    ) { }

    // Swagger decorators
    @ApiOperation({ description: 'Sign Up', operationId: 'signup', title: 'Sign Up' })
    @ApiResponse({ status: 200, description: 'User Created', type: DocumentCreatedDto })
    // Http decorators
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<DocumentCreatedDto> {
        return await this.usersService.create(createUserDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Login', operationId: 'login', title: 'Login' })
    @ApiResponse({ status: 200, description: 'Login Successful' })
    // Http decorators
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userCredentials: UserLoginDto): Promise<JWTToken> {
        return await this.authenticationService.login(userCredentials);
    }
}
