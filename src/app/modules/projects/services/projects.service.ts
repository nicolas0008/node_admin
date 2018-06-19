import { Injectable } from '@nestjs/common';

import { CreateProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectsRepository } from '../repository';
import { Project } from '../entities';
import { UsersService } from '../../users/services';
import { FeaturesService } from '../../features/services';
import { DocumentCreatedDto } from '../../common/dtos';

/**
 * Projects Service
 *
 * @export
 * @class ProjectsService
 */
@Injectable()
export class ProjectsService {
    constructor(
        private readonly projectsRepository: ProjectsRepository,
        private readonly usersService: UsersService,
        private readonly featuresService: FeaturesService
    ) { }

    /**
     * Creates a project
     *
     * @param {CreateProjectDto} createProjectDto
     * @returns {Promise<DocumentCreatedDto>}
     * @memberof ProjectsService
     */
    async create(createProjectDto: CreateProjectDto): Promise<DocumentCreatedDto> {
        return await this.projectsRepository.index(createProjectDto);
    }

    /**
     * Returns all projects
     *
     * @param {boolean} [fetchUsers=false]
     * @param {boolean} [fetchFeatures=false]
     * @returns {Promise<Project[]>}
     * @memberof ProjectsService
     */
    async fetchAll(fetchUsers: boolean = false, fetchFeatures: boolean = false): Promise<Project[]> {
        const projects = await this.projectsRepository.fetchAll();
        for (let project of projects) {
            if (fetchUsers) {
                project = await this.getUsers(project);
            }
            if (fetchFeatures) {
                project = await this.getFeatures(project);
            }
        }

        return projects;
    }

    /**
     * Updates an user by ID
     *
     * @param {string} id
     * @param {UpdateProjectDto} updatedProjectDto
     * @returns {Promise<Project>}
     * @memberof ProjectsService
     */
    async update(id: string, updatedProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = new Project();
        Object.assign(updatedProject, updatedProjectDto);
        return await this.projectsRepository.updateById(id, updatedProject);
    }

    /**
     * Gets a set of users by ID's
     *
     * @param {string[]} projectIds
     * @param {boolean} [fetchUsers=false]
     * @param {boolean} [fetchFeatures=false]
     * @returns {Promise<Project[]>}
     * @memberof ProjectsService
     */
    async fetchByIds(projectIds: string[], fetchUsers: boolean = false, fetchFeatures: boolean = false): Promise<Project[]> {
        const projects = await this.projectsRepository.fetchByIds(projectIds);
        for (let project of projects) {
            if (fetchUsers) {
                project = await this.getUsers(project);
            }
            if (fetchFeatures) {
                project = await this.getFeatures(project);
            }
        }

        return projects;
    }

    /**
     * Gets a project by ID
     *
     * @param {string} id
     * @param {boolean} [fetchUsers=false]
     * @param {boolean} [fetchFeatures=false]
     * @returns {Promise<Project>}
     * @memberof ProjectsService
     */
    async fetchById(id: string, fetchUsers: boolean = false, fetchFeatures: boolean = false): Promise<Project> {
        let project = await this.projectsRepository.fetchById(id);
        if (fetchUsers) {
            project = await this.getUsers(project);
        }
        if (fetchFeatures) {
            project = await this.getFeatures(project);
        }

        return project;
    }

    /**
     * Gets all users for a project
     *
     * @param {Project} project
     * @returns {Promise<Project>}
     * @memberof ProjectsService
     */
    async getUsers(project: Project): Promise<Project> {
        if (project.users && project.users.length > 0) {
            project.usersObj = await this.usersService.fetchByIds(project.users);
        }
        return project;
    }

    /**
     * Gets all features for a project
     *
     * @param {Project} project
     * @returns {Promise<Project>}
     * @memberof ProjectsService
     */
    async getFeatures(project: Project): Promise<Project> {
        if (project.features && project.features.length > 0) {
            project.featuresObj = await this.featuresService.fetchByIds(project.features);
        }
        return project;
    }
}
