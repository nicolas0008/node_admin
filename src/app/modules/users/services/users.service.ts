import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repository';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async create(createUserDto: CreateUserDto): Promise<{ identity: string }> {
        const user = await this.usersRepository.index(createUserDto);
        return { identity: user.identity };
    }

    async fetchByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });
        return user;
    }

    async fetchByIdentity(u_id: string): Promise<User> {
        const user = await this.usersRepository.findById(u_id);
        return user;
    }
}
