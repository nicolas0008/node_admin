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
        return await this.featuresRepository.findAll();
    }

    async update(id: string, updatedFeatureDto: UpdateFeatureDto): Promise<Feature> {
        const updatedFeature = new Feature();
        Object.assign(updatedFeature, updatedFeatureDto);
        return await this.featuresRepository.updateById(id, updatedFeature);
    }

    async fetchByIds(featureIds: string[]): Promise<Feature[]> {
        return await this.featuresRepository.findByIds(featureIds);
    }

    async fetchById(id: string): Promise<Feature> {
        return await this.featuresRepository.findById(id);
    }
}
