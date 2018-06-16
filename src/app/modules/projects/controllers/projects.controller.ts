import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateProjectDto, UpdateProjectDto, ProjectDto } from '../dtos';
import { ProjectsService } from '../services';
import { Project } from '../entities';
import { DocumentCreatedDto } from '../../common/dtos';
import { RolesGuard } from '../../common/guards';
import { Roles, RoleType } from '../../common/decorators';

@Roles(RoleType.Admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized.'})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiUseTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ) {}

    @ApiOperation({ description: 'Create new project', operationId: 'createProject', title: 'Create new project' })
    @ApiResponse({ status: 201, description: 'Project Created', type: DocumentCreatedDto })
    @ApiBearerAuth()
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProjectDto: CreateProjectDto): Promise<DocumentCreatedDto> {
        return await this.projectsService.create(createProjectDto);
    }

    @ApiOperation({ description: 'Fetch all projects', operationId: 'fetchAllProjects', title: 'Fetch all projects' })
    @ApiResponse({ status: 200, description: 'Projects list', type: ProjectDto, isArray: true })
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async fetchAll(): Promise<ProjectDto[]> {
        return await this.projectsService.fetchAll(true, true);
    }

    @ApiOperation({ description: 'Update project', operationId: 'updateProject', title: 'Update project' })
    @ApiResponse({ status: 200, description: 'Project updated', type: ProjectDto })
    @ApiBearerAuth()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
        return await this.projectsService.update(id, updateProjectDto);
    }

    @ApiOperation({ description: 'Fetch project by Id', operationId: 'fetchProjectById', title: 'Fetch project by Id' })
    @ApiResponse({ status: 200, description: 'Project Found', type: ProjectDto })
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async fetch(@Param('id') id: string): Promise<ProjectDto> {
        return await this.projectsService.fetchById(id, true, true);
    }
}
