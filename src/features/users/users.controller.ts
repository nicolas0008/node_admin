import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { SignInDto } from '../users/dto/signin.dto';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signup')
    async signUp(@Body() user: SignInDto) {
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
}
