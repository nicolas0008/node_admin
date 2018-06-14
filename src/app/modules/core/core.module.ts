import { Module } from '@nestjs/common';
import { ElasticSearchProvider } from './database/elasticsearch';

@Module({
    providers: [
        ElasticSearchProvider
    ],
    exports: [
        ElasticSearchProvider
    ]
})
export class CoreModule {}
