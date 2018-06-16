import { Injectable } from '@nestjs/common';

import { RolesService } from '../../roles/services';
import { UsersRepository } from '../repository';
import { User } from '../entities';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { DocumentCreatedDto } from '../../common/dtos';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly rolesService: RolesService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<DocumentCreatedDto> {
        return await this.usersRepository.index(createUserDto);
    }

    async fetchByEmail(email: string, fetchRoles = false): Promise<User> {
        let user = await this.usersRepository.fetchOne({ email });
        if (fetchRoles) {
            user = await this.getRoles(user);
        }
        return user;
    }

    async fetchById(u_id: string, fetchRoles = false): Promise<User> {
        let user = await this.usersRepository.fetchById(u_id);
        if (fetchRoles) {
            user = await this.getRoles(user);
        }
        return user;
    }

    async fetchByIds(featureIds: string[], fetchRoles = false): Promise<User[]> {
        const users = await this.usersRepository.fetchByIds(featureIds);
        if (fetchRoles) {
            for (let user of users) {
                user = await this.getRoles(user);
            }
        }
        return users;
    }

    async fetchAll(fetchRoles = false): Promise<User[]> {
        const users = await this.usersRepository.fetchAll();
        if (fetchRoles) {
            for (let user of users) {
                user = await this.getRoles(user);
            }
        }
        return users;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = new User();
        Object.assign(updatedUser, updateUserDto);
        return await this.usersRepository.updateById(id, updatedUser);
    }

    async getRoles(user: User): Promise<User> {
        if (user.roles && user.roles.length > 0) {
            user.rolesObj = await this.rolesService.fetchByIds(user.roles, true);
        }
        return user;
    }
}
