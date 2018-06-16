import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateFeatureDto, UpdateFeatureDto, FeatureDto } from '../dtos';
import { FeaturesService } from '../services';
import { Feature } from '../entities';
import { RolesGuard } from '../../common/guards';
import { Roles, RoleType } from '../../common/decorators';
import { DocumentCreatedDto } from '../../common/dtos';

@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiUseTags('Features')
@Controller('features')
export class FeaturesController {
    constructor(
        private readonly featuresService: FeaturesService
    ) {}

    @ApiOperation({ description: 'Create new feature', operationId: 'createFeature', title: 'Create new feature' })
    @ApiResponse({ status: 201, description: 'Feature Created', type: DocumentCreatedDto })
    @ApiBearerAuth()
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createFeatureDto: CreateFeatureDto): Promise<DocumentCreatedDto> {
        return await this.featuresService.create(createFeatureDto);
    }

    @ApiOperation({ description: 'Fetch all features', operationId: 'fetchAllFeatures', title: 'Fetch all features' })
    @ApiResponse({ status: 200, description: 'Features list', type: FeatureDto, isArray: true })
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<FeatureDto[]> {
        return await this.featuresService.fetchAll();
    }

    @ApiOperation({ description: 'Update feature', operationId: 'updateFeature', title: 'Update feature' })
    @ApiResponse({ status: 200, description: 'Feature updated', type: FeatureDto })
    @ApiBearerAuth()
    // Http decorators
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto): Promise<FeatureDto> {
        return await this.featuresService.update(id, updateFeatureDto);
    }

    @ApiOperation({ description: 'Fetch feature by Id', operationId: 'fetchFeatureById', title: 'Fetch feature by Id' })
    @ApiResponse({ status: 200, description: 'Feature Found', type: FeatureDto })
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<FeatureDto> {
        return await this.featuresService.fetchById(id);
    }
}
