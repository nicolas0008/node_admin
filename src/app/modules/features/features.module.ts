import { Module } from '@nestjs/common';

import { UsersModule } from '../users';
import { CoreModule } from '../core';
import { FeaturesController } from './controllers';
import { FeaturesService } from './services';
import { FeaturesRepository } from './repository';

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
})
export class FeaturesModule { }
