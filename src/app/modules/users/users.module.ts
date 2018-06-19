import { Module } from '@nestjs/common';

import { RolesModule } from '../roles/roles.module';
import { CoreModule } from '../core/core.module';
import { UsersService } from './services';
import { UsersRepository } from './repository';
import { UsersController } from './controllers';

/**
 * Users Module
 *
 * @export UsersService
 * @class UsersModule
 */
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
