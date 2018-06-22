import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { FeaturesModule } from '../features/features.module';
import { RolesService } from './services';
import { RolesRepository } from './repository';
import { RolesController } from './controllers';

/**
 * Roles Module
 *
 * @export RolesService
 * @class RolesModule
 */
@Module({
    imports: [
        SharedModule,
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
