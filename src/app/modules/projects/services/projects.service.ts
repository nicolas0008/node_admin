import { Injectable } from '@nestjs/common';

import { CreateProjectDto, UpdateProjectDto, DocumentCreatedDto } from '../../';
import { ProjectsRepository } from '../repository/projects.repository';
import { Project } from '../entities/projects.entity';
import { UsersService } from '../../users/services/users.service';
import { FeaturesService } from '../../features/services/features.service';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly projectsRepository: ProjectsRepository,
        private readonly usersService: UsersService,
        private readonly featuresService: FeaturesService
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<DocumentCreatedDto> {
        return await this.projectsRepository.index(createProjectDto);
    }

    async fetchAll(fetchUsers = false, fetchFeatures = false): Promise<Project[]> {
        const projects = await this.projectsRepository.findAll();
        if (fetchUsers) {
            for (let project of projects) {
                project = await this.getUsers(project);
            }
        }
        if (fetchFeatures) {
            for (let project of projects) {
                project = await this.getFeatures(project);
            }
        }
        return projects;
    }

    async update(id: string, updatedProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = new Project();
        Object.assign(updatedProject, updatedProjectDto);
        return await this.projectsRepository.updateById(id, updatedProject);
    }

    async fetchByIds(projectIds: string[], fetchUsers = false, fetchFeatures = false): Promise<Project[]> {
        const projects = await this.projectsRepository.findByIds(projectIds);
        if (fetchUsers) {
            for (let project of projects) {
                project = await this.getUsers(project);
            }
        }
        if (fetchFeatures) {
            for (let project of projects) {
                project = await this.getFeatures(project);
            }
        }
        return projects;
    }

    async fetchById(id: string, fetchUsers = false, fetchFeatures = false): Promise<Project> {
        let project = await this.projectsRepository.findById(id);
        if (fetchUsers) {
            project = await this.getUsers(project);
        }
        if (fetchFeatures) {
            project = await this.getFeatures(project);
        }
        return project;
    }

    async getUsers(project: Project): Promise<Project> {
        if (project.users && project.users.length > 0) {
            project.usersObj = await this.usersService.fetchByIds(project.users);
        }
        return project;
    }

    async getFeatures(project: Project): Promise<Project> {
        if (project.features && project.features.length > 0) {
            project.featuresObj = await this.featuresService.fetchByIds(project.features);
        }
        return project;
    }
}
