import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repository';
import { User } from '../entities';
import { RolesService } from '../../roles/services';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { DocumentCreatedDto } from '../../common/dtos';

/**
 * Users Service
 *
 * @class UsersService
 */
@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly rolesService: RolesService
    ) { }

    /**
     * Creates an user
     *
     * @param {CreateUserDto} createUserDto
     * @returns {Promise<DocumentCreatedDto>}
     * @memberof UsersService
     */
    async create(createUserDto: CreateUserDto): Promise<DocumentCreatedDto> {
        return await this.usersRepository.index(createUserDto);
    }

    /**
     * Gets an user by email
     *
     * @param {string} email
     * @param {boolean} [fetchRoles=false]
     * @returns {Promise<User>}
     * @memberof UsersService
     */
    async fetchByEmail(email: string, fetchRoles: boolean = false): Promise<User> {
        let user = await this.usersRepository.fetchOne({ email });
        if (fetchRoles) {
            user = await this.getRoles(user);
        }
        return user;
    }

    /**
     * Gets an user by ID
     *
     * @param {string} id
     * @param {boolean} [fetchRoles=false]
     * @returns {Promise<User>}
     * @memberof UsersService
     */
    async fetchById(id: string, fetchRoles: boolean = false): Promise<User> {
        let user = await this.usersRepository.fetchById(id);
        if (fetchRoles) {
            user = await this.getRoles(user);
        }
        return user;
    }

    /**
     * Gets a set of users by ID's
     *
     * @param {string[]} featureIds
     * @param {boolean} [fetchRoles=false]
     * @returns {Promise<User[]>}
     * @memberof UsersService
     */
    async fetchByIds(featureIds: string[], fetchRoles: boolean = false): Promise<User[]> {
        const users = await this.usersRepository.fetchByIds(featureIds);
        if (fetchRoles) {
            for (let user of users) {
                user = await this.getRoles(user);
            }
        }
        return users;
    }

    /**
     * Gets all users
     *
     * @param {boolean} [fetchRoles=false]
     * @returns {Promise<User[]>}
     * @memberof UsersService
     */
    async fetchAll(fetchRoles: boolean = false): Promise<User[]> {
        const users = await this.usersRepository.fetchAll();
        if (fetchRoles) {
            for (let user of users) {
                user = await this.getRoles(user);
            }
        }
        return users;
    }

    /**
     * Updates an user by ID
     *
     * @param {string} id
     * @param {UpdateUserDto} updateUserDto
     * @returns {Promise<User>}
     * @memberof UsersService
     */
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = new User();
        Object.assign(updatedUser, updateUserDto);
        return await this.usersRepository.updateById(id, updatedUser);
    }

    /**
     * Gets all roles from an user
     *
     * @param {User} user
     * @returns {Promise<User>}
     * @memberof UsersService
     */
    async getRoles(user: User): Promise<User> {
        if (user.roles && user.roles.length > 0) {
            user.rolesObj = await this.rolesService.fetchByIds(user.roles, true);
        }
        return user;
    }
}
