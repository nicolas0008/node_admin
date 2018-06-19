import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { BaseRepository } from '../../core/repository';
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
