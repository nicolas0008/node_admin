import { Injectable } from '@nestjs/common';

import { FeaturesRepository } from '../../repository';
import { Feature } from '../../entities/features.entity';
import { CreateFeatureDto } from '../../dtos';

@Injectable()
export class FeaturesService {
    constructor(
        private readonly featuresRepository: FeaturesRepository
    ) { }

    async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
        const feature = await this.featuresRepository.index(createFeatureDto);
        return feature;
    }

    async fetchAll(): Promise<Feature[]> {
        const features = await this.featuresRepository.findAll();
        return features;
    }
}
