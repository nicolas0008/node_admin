import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
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
