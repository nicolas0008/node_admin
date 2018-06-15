import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateFeatureDto } from '../';
import { FeaturesService } from '../services/features.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, RoleType } from '../../common/decorators/roles.decorator';
import { Feature } from '../entities/features.entity';
import { DocumentCreatedDto } from '../../common/dtos';

@ApiUseTags('Features')
@Controller('features')
export class FeaturesController {
    constructor(
        private readonly featuresService: FeaturesService
    ) {}

    // Swagger decorators
    @ApiOperation({ description: 'Create new feature', operationId: 'createFeature', title: 'Create new feature' })
    @ApiResponse({ status: 201, description: 'Feature Created', type: DocumentCreatedDto })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createFeatureDto: CreateFeatureDto): Promise<DocumentCreatedDto> {
        return await this.featuresService.create(createFeatureDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find all features', operationId: 'findAllFeatures', title: 'Find all features' })
    @ApiResponse({ status: 200, description: 'Features list' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Feature[]> {
        return await this.featuresService.fetchAll();
    }
}
