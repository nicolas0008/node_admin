import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { DocumentCreatedDto } from '../../common/dtos';

export class BaseRepository<T> {
    constructor(
        private readonly esProvider: ElasticSearchProvider,
        private readonly type: { new(): T; }
    ) { }

    async index(dto: any): Promise<DocumentCreatedDto> {
        return this.esProvider.index(dto, this.type);
    }

    async updateById(id: string, updatedEntity: T) {
        return this.esProvider.updateById(updatedEntity, id, this.type);
    }

    async fetchByIds(ids: string[]): Promise<T[]> {
        return this.esProvider.fetchByIds(ids, this.type);
    }

    async fetchById(id: string): Promise<T> {
        return this.esProvider.fetchById(id, this.type);
    }

    async fetchOne(content: any): Promise<T> {
        return this.esProvider.fetchOne(content, this.type);
    }

    async fetchAll(): Promise<T[]> {
        return this.esProvider.fetchAll(this.type);
    }
}
