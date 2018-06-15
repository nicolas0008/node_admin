import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { CoreModule } from '../core/core.module';
import { ProjectsService } from './services/projects.service';
import { ProjectsRepository } from './repository/projects.repository';
import { ProjectsController } from './controllers/projects.controller';

@Module({
    imports: [
        CoreModule
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
