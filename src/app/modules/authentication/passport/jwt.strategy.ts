import * as passport from 'passport';
import * as express from 'express';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { UsersService, AuthorizedUser } from '../../users';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

@Injectable()
export class JwtStrategy extends Strategy {
    constructor(private readonly usersService: UsersService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: 'secretKey'
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
    }

    public async verify(req: express.Request, payload: JWTPayload, done: any) {
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
