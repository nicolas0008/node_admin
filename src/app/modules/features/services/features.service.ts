import { Injectable } from '@nestjs/common';

import { CreateFeatureDto, FeatureDto, UpdateFeatureDto } from '../dtos';
import { FeaturesRepository } from '../repository';
import { Feature } from '../entities';
import { DocumentCreatedDto } from '../../common/dtos';

/**
 * Features service
 *
 * @class FeaturesService
 */
@Injectable()
export class FeaturesService {
    constructor(
        private readonly featuresRepository: FeaturesRepository
    ) { }

    /**
     * Creates a new feature
     *
     * @param {CreateFeatureDto} createFeatureDto
     * @returns {Promise<DocumentCreatedDto>}
     * @memberof FeaturesService
     */
    async create(createFeatureDto: CreateFeatureDto): Promise<DocumentCreatedDto> {
        return await this.featuresRepository.index(createFeatureDto);
    }

    /**
     * Gets all the features
     *
     * @returns {Promise<FeatureDto[]>}
     * @memberof FeaturesService
     */
    async fetchAll(): Promise<FeatureDto[]> {
        return await this.featuresRepository.fetchAll();
    }

    /**
     * Updates a feature by ID
     *
     * @param {string} id
     * @param {UpdateFeatureDto} updatedFeatureDto
     * @returns {Promise<FeatureDto>}
     * @memberof FeaturesService
     */
    async update(id: string, updatedFeatureDto: UpdateFeatureDto): Promise<FeatureDto> {
        const updatedFeature = new Feature();
        Object.assign(updatedFeature, updatedFeatureDto);
        return await this.featuresRepository.updateById(id, updatedFeature);
    }

    /**
     * Gets features by ID's
     *
     * @param {string[]} featureIds
     * @returns {Promise<FeatureDto[]>}
     * @memberof FeaturesService
     */
    async fetchByIds(featureIds: string[]): Promise<FeatureDto[]> {
        return await this.featuresRepository.fetchByIds(featureIds);
    }

    /**
     * Gets a feature by ID
     *
     * @param {string} id
     * @returns {Promise<FeatureDto>}
     * @memberof FeaturesService
     */
    async fetchById(id: string): Promise<FeatureDto> {
        return await this.featuresRepository.fetchById(id);
    }
}
