import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../../shared/database/elasticsearch';
import { BaseRepository } from '../../../shared/repository';
import { Project } from '../entities';

/**
 * Projects repository
 *
 * @class ProjectsRepository
 * @extends {BaseRepository<Project>}
 */
@Injectable()
export class ProjectsRepository extends BaseRepository<Project> {
    constructor(private readonly elasticSearchProvider: ElasticSearchProvider) {
        super(elasticSearchProvider, Project);
    }
}
