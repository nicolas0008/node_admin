import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UsersService } from '../../users/services';
import { UnauthorizedException } from '../../../shared/exceptions';
import { User } from '../../users/entities';
import { UserLoginDto } from '../dtos';
import { AuthorizedUserDto } from '../../users/dtos';
import { JWTToken, JWTPayload } from '../interfaces';

/**
 * Service used in the authentication process
 *
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {
    constructor(private readonly usersService: UsersService) { }

    /**
     * Tries to login
     *
     * @param {UserLoginDto} userCredentials
     * @returns {Promise<JWTToken>} Returns a JWTToken with the user authenticated
     * @memberof AuthenticationService
     */
    async login(userCredentials: UserLoginDto): Promise<JWTToken> {
        const user = await this.usersService.fetchByEmail(userCredentials.email);
        const isValidPassword = await user.comparePassword(userCredentials.password);
        if (!user || !isValidPassword) {
            throw new UnauthorizedException();
        }
        return this.createToken(user);
    }

    /**
     * Generates the auth token
     *
     * @private
     * @param {User} user
     * @returns {JWTToken}
     * @memberof AuthenticationService
     */
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
            user: new AuthorizedUserDto(user)
        };
    }
}
