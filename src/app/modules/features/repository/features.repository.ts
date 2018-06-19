import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { BaseRepository } from '../../core/repository';
import { Feature } from '../entities';

/**
 * Features repository
 *
 * @class FeaturesRepository
 * @extends {BaseRepository<Feature>}
 */
@Injectable()
export class FeaturesRepository extends BaseRepository<Feature> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Feature);
    }
}
