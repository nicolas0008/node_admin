import { Module } from '@nestjs/common';

import { UsersService } from './services/users/users.service';
import { CoreModule } from '../core';
import { UsersRepository } from './repository';

@Module({
    imports: [
        CoreModule
    ],
    providers: [
        UsersService,
        UsersRepository
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
