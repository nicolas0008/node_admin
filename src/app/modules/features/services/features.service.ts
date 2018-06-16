import { Injectable } from '@nestjs/common';

import { CreateFeatureDto, FeatureDto, UpdateFeatureDto } from '../dtos';
import { FeaturesRepository } from '../repository';
import { Feature } from '../entities';
import { DocumentCreatedDto } from '../../common/dtos';

@Injectable()
export class FeaturesService {
    constructor(
        private readonly featuresRepository: FeaturesRepository
    ) { }

    async create(createFeatureDto: CreateFeatureDto): Promise<DocumentCreatedDto> {
        return await this.featuresRepository.index(createFeatureDto);
    }

    async fetchAll(): Promise<FeatureDto[]> {
        return await this.featuresRepository.fetchAll();
    }

    async update(id: string, updatedFeatureDto: UpdateFeatureDto): Promise<FeatureDto> {
        const updatedFeature = new Feature();
        Object.assign(updatedFeature, updatedFeatureDto);
        return await this.featuresRepository.updateById(id, updatedFeature);
    }

    async fetchByIds(featureIds: string[]): Promise<FeatureDto[]> {
        return await this.featuresRepository.fetchByIds(featureIds);
    }

    async fetchById(id: string): Promise<FeatureDto> {
        return await this.featuresRepository.fetchById(id);
    }
}
