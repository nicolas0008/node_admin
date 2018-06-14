import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { CoreModule } from '../core/core.module';
import { FeaturesService } from './services/features.service';
import { FeaturesRepository } from './repository/features.repository';
import { FeaturesController } from './controllers/features.controller';

@Module({
    imports: [
        CoreModule
    ],
    providers: [
        FeaturesService,
        FeaturesRepository
    ],
    controllers: [
        FeaturesController
    ],
    exports: [
        FeaturesService
    ]
})
export class FeaturesModule { }
