import { Controller, Post, Get, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from '../database/entities/users.entity';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signin')
    async signIn(user: User) {

        return await this.usersService.create(user).then(body => {
            return 'The result was ' + body.result + ' - ID: ' + body._id;
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }

    @Get('signin/:user')
    async getSign(@Param() user: User) {
        return await this.usersService.get().then(body => {
            return body.hits.hits;
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }
}
