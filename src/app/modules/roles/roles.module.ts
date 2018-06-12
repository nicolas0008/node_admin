import { Module } from '@nestjs/common';

import { UsersModule } from '../users';
import { CoreModule } from '../core';
import { RolesController } from './controllers';
import { RolesService } from './services';
import { RolesRepository } from './repository';

@Module({
    imports: [
        CoreModule
    ],
    providers: [
        RolesService,
        RolesRepository
    ],
    controllers: [
        RolesController
    ],
})
export class RolesModule { }
