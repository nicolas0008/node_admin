import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { FeaturesService } from './services';
import { FeaturesRepository } from './repository';
import { FeaturesController } from './controllers';

/**
 * Features module
 *
 * @exports FeaturesService
 * @class FeaturesModule
 */
@Module({
    imports: [
        SharedModule
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
