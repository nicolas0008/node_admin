import { Controller, Post, Get, Body, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDto } from '../users/classes/signin.dto';
import { AuthService } from '../authentication/auth.service';

@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.usersService.createUser(user).then(body => {
            return 'The creation was ' + body.result;
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }

    @Get('signin')
    async signIn() {

    }

    @Get('getToken')
    getToken() {
        return this.usersService.createToken({ userName: 'ntillet', password: 'nicolas' });
    }

    @Get('userLogged')
    @UseGuards(AuthGuard('jwt'))
    findUser(@Req() request, @Res() response) {
        response.status(HttpStatus.FOUND).json({ username: request.user.userName });
    }
}
