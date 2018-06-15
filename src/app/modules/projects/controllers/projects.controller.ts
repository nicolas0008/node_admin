import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ProjectsService } from '../services/projects.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, RoleType } from '../../common/decorators/roles.decorator';
import { Project } from '../entities/projects.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { DocumentCreatedDto } from '../../common/dtos';

@ApiUseTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ) {}

    // Swagger decorators
    @ApiOperation({ description: 'Create new project', operationId: 'createProject', title: 'Create new project' })
    @ApiResponse({ status: 201, description: 'Project Created', type: DocumentCreatedDto })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProjectDto: CreateProjectDto): Promise<DocumentCreatedDto> {
        return await this.projectsService.create(createProjectDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find all projects', operationId: 'findAllProjects', title: 'Find all projects' })
    @ApiResponse({ status: 200, description: 'Projects list' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Project[]> {
        return await this.projectsService.fetchAll();
    }

    // Swagger decorators
    @ApiOperation({ description: 'Update project', operationId: 'updateProject', title: 'Update project' })
    @ApiResponse({ status: 200, description: 'Project updated' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
        return await this.projectsService.update(id, updateProjectDto);
    }

    // Swagger decorators
    @ApiOperation({ description: 'Find project by Id', operationId: 'findProjectById', title: 'Find project by Id' })
    @ApiResponse({ status: 200, description: 'Project Found' })
    @ApiBearerAuth()
    // Authentication decorators
    @Roles(RoleType.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // Http decorators
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async find(@Param('id') id: string): Promise<Project> {
        return await this.projectsService.fetchById(id, true, true);
    }
}
