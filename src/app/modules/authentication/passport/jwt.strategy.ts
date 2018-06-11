import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';
import * as express from 'express';

import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { UsersService, AuthorizedUser } from '../../users';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        });
    }

    public async validate(payload: JWTPayload, done: any) {
        if (!payload || !payload.u_id) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.fetchByIdentity(payload.u_id);
        if (!user) {
            throw new UnauthorizedException();
        }

        done(null, new AuthorizedUser(user));
    }
}
