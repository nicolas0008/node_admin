import { Controller, Post, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signin')
    async signIn() {
        this.usersService.create();
    }

    @Get('signin')
    getSign() {
        return this.usersService.get();
    }
}
