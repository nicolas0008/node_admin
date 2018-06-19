import { Module } from '@nestjs/common';
import { ElasticSearchProvider } from './database/elasticsearch';

/**
 * Core module
 *
 * @exports ElasticSearchProvider
 * @class CoreModule
 */
@Module({
    providers: [
        ElasticSearchProvider
    ],
    exports: [
        ElasticSearchProvider
    ]
})
export class CoreModule {}
