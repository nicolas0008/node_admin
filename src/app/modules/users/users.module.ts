import { Module } from '@nestjs/common';

import { CoreModule } from '../core';
import { UsersRepository } from './repository';
import { UsersService } from './services';

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
