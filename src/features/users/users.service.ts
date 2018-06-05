import { Injectable } from '@nestjs/common';

import { BaseService } from '../base.service';
import { User } from '../../database/entities/users.entity';
import { UsersRepository } from './users.repository';
import { UserDto } from './classes/signin.dto';

@Injectable()
export class UsersService extends BaseService {
    constructor(private usersRepository: UsersRepository) {
        super();
    }

    create(signInDto: UserDto) {
        const user = this.directMapping<User>(signInDto, User);
        return this.usersRepository.index(user);
    }

    search(content: any): Promise<User[]> {
        return this.usersRepository.search(content).then(baseEntity => {
            return baseEntity.hits.hits;
        });
    }
}
