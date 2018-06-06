import { Injectable, Inject, forwardRef, Delete } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../../database/entities/users.entity';
import { UserDto } from '../users/classes/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ) { }

    createToken(user: User) {
        const expiresIn = 3600;
        const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
        return {
            expiresIn, accessToken
        };
    }

    async validateUser(payload: UserDto): Promise<UserDto> {
        // Delete all the properties from session
        if (payload.hasOwnProperty('iat')){
            delete payload.iat;
        }
        if (payload.hasOwnProperty('exp')){
            delete payload.exp;
        }
        return await this.usersService.findUser(payload);
    }
}