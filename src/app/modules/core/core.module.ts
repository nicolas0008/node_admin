import { Module } from '@nestjs/common';
import { ElasticSearchProvider } from './database/elasticsearch/elasticsearch.provider';

@Module({
    providers: [
        ElasticSearchProvider
    ],
    exports: [
        ElasticSearchProvider
    ]
})
export class CoreModule {}
