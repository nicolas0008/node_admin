import { Module } from '@nestjs/common';

import { RolesModule } from '../roles/roles.module';
import { CoreModule } from '../core/core.module';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './controllers';

@Module({
    imports: [
        CoreModule,
        RolesModule
    ],
    providers: [
        UsersService,
        UsersRepository
    ],
    controllers: [
        UsersController
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
