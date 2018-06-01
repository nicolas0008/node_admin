import { Injectable } from '@nestjs/common';

import { BaseService } from '../base.service';
import { User } from '../../database/entities/users.entity';
import { UsersRepository } from './users.repository';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class UsersService extends BaseService {
    constructor(private usersRepository: UsersRepository) {
        super();
    }

    async create(signInDto: SignInDto) {
        const user = this.directMapping(signInDto, User);

        return this.usersRepository.index(user);
    }

    async search(content: any): Promise<User[]> {
        return this.usersRepository.search(content).then(baseEntity => {
            return baseEntity.hits.hits;
        });
    }
}
