import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { CoreModule } from '../core/core.module';
import { FeaturesService } from './services';
import { FeaturesRepository } from './repository';
import { FeaturesController } from './controllers';

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
