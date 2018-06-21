import { Module } from '@nestjs/common';
import { ElasticSearchProvider } from './database/elasticsearch';

/**
 * Core module
 *
 * @exports ElasticSearchProvider
 * @class SharedModule
 */
@Module({
    providers: [
        ElasticSearchProvider
    ],
    exports: [
        ElasticSearchProvider
    ]
})
export class SharedModule {}
