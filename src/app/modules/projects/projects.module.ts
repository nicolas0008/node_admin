import { Module } from '@nestjs/common';

import { FeaturesModule } from '../features/features.module';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsService } from './services';
import { ProjectsRepository } from './repository';
import { ProjectsController } from './controllers';

/**
 * Projects module
 *
 * @export ProjectsService
 * @class ProjectsModule
 */
@Module({
    imports: [
        SharedModule,
        UsersModule,
        FeaturesModule
    ],
    providers: [
        ProjectsService,
        ProjectsRepository
    ],
    controllers: [
        ProjectsController
    ],
    exports: [
        ProjectsService
    ]
})
export class ProjectsModule { }
