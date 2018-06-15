import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core';
import { BaseRepository } from '../../core/repository/base.repository';
import { Project } from '../entities/projects.entity';

@Injectable()
export class ProjectsRepository extends BaseRepository<Project> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Project);
    }
}
