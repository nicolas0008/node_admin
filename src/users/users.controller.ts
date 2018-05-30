import { Controller, Post, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from '../elasticsearch/entities/users.entity';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('signin')
    async signIn() {
        const user = new User();
        user.firstName = 'FirstName2';
        user.lastName = 'LastName2';

        return await this.usersService.create(user).then(body => {
            return 'The result was ' + body.result + ' - ID: ' + body._id;
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }

    @Post('signin')
    async getSign() {
        return await this.usersService.get().then(body => {
            return body.hits.hits;
        }, error => {
            // tslint:disable-next-line:no-console
            console.trace(error.message);
        });
    }
}
