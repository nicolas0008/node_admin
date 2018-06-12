import { Injectable } from '@nestjs/common';

import { RolesRepository } from '../repository';
import { Role } from '../entities/roles.entity';
import { CreateRoleDto } from '../dtos';

@Injectable()
export class RolesService {
    constructor(
        private readonly featuresRepository: RolesRepository
    ) { }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const feature = await this.featuresRepository.index(createRoleDto);
        return feature;
    }

    async fetchAll(): Promise<Role[]> {
        const features = await this.featuresRepository.findAll();
        return features;
    }
}
