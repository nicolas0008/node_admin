import { Module } from '@nestjs/common';

import { RolesModule } from '../roles/roles.module';
import { UsersService } from './services';
import { UsersRepository } from './repository';
import { UsersController } from './controllers';
import { SharedModule } from '../../shared/shared.module';

/**
 * Users Module
 *
 * @export UsersService
 * @class UsersModule
 */
@Module({
    imports: [
        SharedModule,
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
