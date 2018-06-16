import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';
import * as express from 'express';

import { UsersService } from '../../users/services';
import { JWTPayload } from '../interfaces';
import { AuthorizedUserDto } from '../../users/dtos';
import { UnauthorizedException } from '../../common/exceptions';

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

        const user = await this.usersService.fetchById(payload.u_id, true);
        if (!user) {
            throw new UnauthorizedException();
        }

        done(null, new AuthorizedUserDto(user));
    }
}
