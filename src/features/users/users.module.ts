import { Module } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository
    ],
    exports: [UsersService]
})
export class UsersModule { }
