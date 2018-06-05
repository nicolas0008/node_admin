import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDto } from '../users/classes/signin.dto';

@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.usersService.create(user).then(body => {
            return 'The creation was ' + body.result;
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }

    @Get('signin')
    async signIn() {
        const user = { firstName: 'FirstName' };
        return await this.usersService.search(user).then(users => {
            return 'There was ' + users.length + ' results';
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }

    @Get('data')
    @UseGuards(AuthGuard('bearer'))
    findAll() {
        const a = 'asd';
    }
}
