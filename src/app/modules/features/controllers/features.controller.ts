import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, UsersService } from '../../users';
import { CreateFeatureDto } from '../dtos';
import { FeaturesService } from '../services/features.service';
import { Feature } from '../entities/features.entity';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@ApiUseTags('Features')
@Controller('features')
export class FeaturesController {
    constructor(
        private readonly featuresService: FeaturesService
    ) {}

    // Swagger decorators
    @ApiOperation({ description: 'Create new feature', operationId: 'createFeature', title: 'Create new feature' })
    @ApiResponse({ status: 201, description: 'Feature Created' })
    @ApiBearerAuth()
    // Authentication decorators
    // @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateFeatureDto): Promise<Feature> {
        return await this.featuresService.create(createUserDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find all features', operationId: 'findAllFeatures', title: 'Find all features' })
    @ApiResponse({ status: 200, description: 'Features list' })
    @ApiBearerAuth()
    // Authentication decorators
    // @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Feature[]> {
        return await this.featuresService.fetchAll();
    }
}
