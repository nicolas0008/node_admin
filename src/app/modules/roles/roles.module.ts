import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { FeaturesModule } from '../features/features.module';
import { RolesService } from './services';
import { RolesRepository } from './repository/roles.repository';
import { RolesController } from './controllers/roles.controller';

@Module({
    imports: [
        CoreModule,
        FeaturesModule
    ],
    providers: [
        RolesService,
        RolesRepository
    ],
    controllers: [
        RolesController
    ],
    exports: [
        RolesService
    ]
})
export class RolesModule { }
