import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { BaseService } from '../base.service';
import { AuthService } from '../authentication/auth.service';
import { UsersRepository } from './users.repository';
import { User } from '../../database/entities/users.entity';
import { UserDto } from './classes/signin.dto';

@Injectable()
export class UsersService extends BaseService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        private readonly usersRepository: UsersRepository
    ) {
        super();
    }

    async createToken(userDto: UserDto) {
        const foundUser = await this.usersRepository.findOne(userDto);
        return this.authService.createToken(foundUser);
    }

    createUser(signInDto: UserDto) {
        const user = new User();
        Object.assign(user, signInDto);
        return this.usersRepository.index(user);
    }

    findUser(userDto: UserDto): Promise<UserDto> {
        return this.usersRepository.findOne(userDto).then(user => {
            let returnDto = new UserDto();
            returnDto = user ? Object.assign(returnDto, user) : null;
            return returnDto;
        });
    }
}
