import { Controller, Post, HttpStatus, HttpCode, Body, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateFeatureDto, UpdateFeatureDto, FeatureDto } from '../dtos';
import { FeaturesService } from '../services';
import { RolesGuard } from '../../common/guards';
import { Roles, RoleType } from '../../common/decorators';
import { DocumentCreatedDto } from '../../common/dtos';

@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiBearerAuth()
@ApiUseTags('Features')
@Controller('features')
export class FeaturesController {
    constructor(
        private readonly featuresService: FeaturesService
    ) {}

    /**
     * Creates a new feature
     *
     * @param {CreateFeatureDto} createFeatureDto
     * @returns {Promise<DocumentCreatedDto>} Promise<DocumentCreatedDto>
     * @memberof FeaturesController
     */
    @ApiOperation({ description: 'Create new feature', operationId: 'createFeature', title: 'Create new feature' })
    @ApiResponse({ status: 201, description: 'Feature Created', type: DocumentCreatedDto })
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createFeatureDto: CreateFeatureDto): Promise<DocumentCreatedDto> {
        return await this.featuresService.create(createFeatureDto);
    }

    /**
     * Returns all features
     *
     * @returns {Promise<FeatureDto[]>} Promise<FeatureDto[]>
     * @memberof FeaturesController
     */
    @ApiOperation({ description: 'Fetch all features', operationId: 'fetchAllFeatures', title: 'Fetch all features' })
    @ApiResponse({ status: 200, description: 'Features list', type: FeatureDto, isArray: true })
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<FeatureDto[]> {
        return await this.featuresService.fetchAll();
    }

    /**
     * Updates a feature by ID
     *
     * @param {string} id
     * @param {UpdateFeatureDto} updateFeatureDto
     * @returns {Promise<FeatureDto>} Promise<FeatureDto>
     * @memberof FeaturesController
     */
    @ApiOperation({ description: 'Update feature', operationId: 'updateFeature', title: 'Update feature' })
    @ApiResponse({ status: 200, description: 'Feature updated', type: FeatureDto })
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto): Promise<FeatureDto> {
        return await this.featuresService.update(id, updateFeatureDto);
    }

    /**
     * Returns a feature by ID
     *
     * @param {string} id
     * @returns {Promise<FeatureDto>} Promise<FeatureDto>
     * @memberof FeaturesController
     */
    @ApiOperation({ description: 'Fetch feature by Id', operationId: 'fetchFeatureById', title: 'Fetch feature by Id' })
    @ApiResponse({ status: 200, description: 'Feature Found', type: FeatureDto })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<FeatureDto> {
        return await this.featuresService.fetchById(id);
    }
}
