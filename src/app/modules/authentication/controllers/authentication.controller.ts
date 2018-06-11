import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors } from '@nestjs/common';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserLoginDto } from '../dtos/user-login.dto';
import { CreateUserDto, UsersService } from '../../users';
import { JWTToken } from '../interfaces/jwt-token.interface';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({ description: 'Sign Up', operationId: 'signup', title: 'Sign Up' })
    @ApiResponse({ status: 200, description: 'User Created' })
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<{ identity: string }> {
        return await this.usersService.create(createUserDto);
    }

    @ApiOperation({ description: 'Login', operationId: 'login', title: 'Login' })
    @ApiResponse({ status: 200, description: 'Login Successful' })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userCredentials: UserLoginDto) {
        return await this.authenticationService.login(userCredentials);
    }
}
