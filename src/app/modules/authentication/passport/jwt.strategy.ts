import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/services';
import { JWTPayload } from '../interfaces';
import { AuthorizedUserDto } from '../../users/dtos';
import { UnauthorizedException } from '../../../shared/exceptions';

/**
 * Strategy to handle users logged in
 *
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        });
    }

    /**
     * Validates the current user from the Authorization Header
     *
     * @param {JWTPayload} payload
     * @param {*} done Function of the type (returnedValue, callback) to execute post validation
     * @returns {Promise<void>}
     * @memberof JwtStrategy
     */
    public async validate(payload: JWTPayload, done: any): Promise<void> {
        if (!payload || !payload.u_id) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.fetchById(payload.u_id, true);
        if (!user) {
            throw new UnauthorizedException();
        }

        done(null, new AuthorizedUserDto(user));
    }
}
