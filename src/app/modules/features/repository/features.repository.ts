import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch/elasticsearch.provider';
import { CreateFeatureDto } from '../dtos';
import { Feature } from '../entities/features.entity';
import { SearchResponse } from 'elasticsearch';

@Injectable()
export class FeaturesRepository {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) { }

    async index(featureDto: CreateFeatureDto) {
        return this.elasticSearchProvider.index(featureDto, Feature);
    }

    async findAll(): Promise<Feature[]> {
        return this.elasticSearchProvider.searchAll(Feature).then((resp: SearchResponse<Feature>) => {
            const featureArr = new Array<Feature>();
            resp.hits.hits.forEach(feature => {
                const featAux = new Feature();
                Object.assign(featAux, feature._source);
                featureArr.push(featAux);
            });
            return featureArr;
        });
    }
}
