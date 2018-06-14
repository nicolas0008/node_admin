import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { JWTToken, JWTPayload, UserLoginDto } from '../';
import { AuthorizedUser } from '../../users';
import { UnauthorizedException } from '../../common';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/users.entity';

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

    private createToken(user: User): JWTToken {
        const expiresIn = 90000; // config
        const secretOrKey = 'secretKey'; // config
        const payload: JWTPayload = {
            u_id: user.id
        };
        const token = jwt.sign(payload, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
            user: new AuthorizedUser(user)
        };
    }
}
