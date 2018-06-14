import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core';
import { BaseRepository } from '../../core/repository/base.repository';
import { Feature } from '../entities/features.entity';

@Injectable()
export class FeaturesRepository extends BaseRepository<Feature> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Feature);
    }
}
