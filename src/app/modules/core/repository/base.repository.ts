import { Injectable } from '@nestjs/common';

import { ElasticSearchProvider } from '../../core/database/elasticsearch';
import { SearchResponse, MGetResponse } from 'elasticsearch';

export class BaseRepository<T> {
    constructor(
        private readonly esProvider: ElasticSearchProvider,
        private readonly type: { new(): T; }
    ) { }

    async index(dto: any) {
        return this.esProvider.index(dto, this.type);
    }

    async updateById(id: string, updatedEntity: T) {
        return this.esProvider.updateById(updatedEntity, id, this.type);
    }

    async findByIds(ids: string[]): Promise<T[]> {
        return this.esProvider.findByIds(ids, this.type);
    }

    async findById(id: string): Promise<T> {
        return this.esProvider.findById(id, this.type);
    }

    async findOne(content: any): Promise<T> {
        return this.esProvider.findOne(content, this.type);
    }

    async findAll(): Promise<T[]> {
        return this.esProvider.findAll(this.type);
    }
}
