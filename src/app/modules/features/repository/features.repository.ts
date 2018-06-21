import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../../shared/database/elasticsearch';
import { BaseRepository } from '../../../shared/repository';
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
