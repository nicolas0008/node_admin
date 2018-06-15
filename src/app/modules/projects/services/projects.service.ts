import { Injectable } from '@nestjs/common';

import { CreateProjectDto, UpdateProjectDto, DocumentCreatedDto } from '../../';
import { ProjectsRepository } from '../repository/projects.repository';
import { Project } from '../entities/projects.entity';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly projectsRepository: ProjectsRepository
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<DocumentCreatedDto> {
        return await this.projectsRepository.index(createProjectDto);
    }

    async fetchAll(): Promise<Project[]> {
        return await this.projectsRepository.findAll();
    }

    async update(id: string, updatedProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = new Project();
        Object.assign(updatedProject, updatedProjectDto);
        return await this.projectsRepository.updateById(id, updatedProject);
    }

    async fetchByIds(projectIds: string[]): Promise<Project[]> {
        return await this.projectsRepository.findByIds(projectIds);
    }

    async fetchById(id: string): Promise<Project> {
        return await this.projectsRepository.findById(id);
    }
}
