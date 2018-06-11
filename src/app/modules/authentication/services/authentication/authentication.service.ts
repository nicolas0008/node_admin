import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../../../users/services';
import { UserLoginDto } from '../../dtos/user-login.dto';
import { UnauthorizedException } from '../../../common/exceptions';
import { JWTToken } from '../../interfaces/jwt-token.interface';
import { User } from '../../../users/entities/users.entity';
import { JWTPayload } from '../../interfaces/jwt-payload.interface';
import { AuthorizedUser } from '../../../users';

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
