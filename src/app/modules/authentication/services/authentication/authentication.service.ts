import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../../../users/services';
import { UserLoginDto } from '../../dtos/user-login.dto';
import { UnauthorizedException } from '../../../common/exceptions';
import { JWTToken } from '../../interfaces/jwt-token.interface';
import { User } from '../../../users/entities/users.entity';

@Injectable()
export class AuthenticationService {
    constructor(private readonly usersService: UsersService) { }

    async login(userCredentials: UserLoginDto): Promise<JWTToken> {
        const user = await this.usersService.fetchByEmail(userCredentials.email);
        const isValidPassword = await user.comparePassword(userCredentials.password);
        if (!user || !isValidPassword) {
            throw new UnauthorizedException();
        }
        return this.createToken(user);
    }

    createToken(user: User): JWTToken {
        const expiresIn = 3600; // config
        const secretOrKey = 'secretKey'; // config
        const token = jwt.sign({ u_id: user.identity }, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }
}
