import { Injectable } from '@nestjs/common';

import { CreateFeatureDto, UpdateFeatureDto, DocumentCreatedDto } from '../../';
import { FeaturesRepository } from '../repository/features.repository';
import { Feature } from '../entities/features.entity';

@Injectable()
export class FeaturesService {
    constructor(
        private readonly featuresRepository: FeaturesRepository
    ) { }

    async create(createFeatureDto: CreateFeatureDto): Promise<DocumentCreatedDto> {
        return await this.featuresRepository.index(createFeatureDto);
    }

    async fetchAll(): Promise<Feature[]> {
        const features = await this.featuresRepository.findAll();
        return features;
    }

    async update(id: string, updatedFeatureDto: UpdateFeatureDto): Promise<Feature> {
        const updatedFeature = new Feature();
        Object.assign(updatedFeature, updatedFeatureDto);
        return await this.featuresRepository.updateById(id, updatedFeature);
    }

    async fetchByIds(featureIds: string[]): Promise<Feature[]> {
        const roles = await this.featuresRepository.findByIds(featureIds);
        return roles;
    }
}
