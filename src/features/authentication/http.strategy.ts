import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
      super();
    }

    async validate(token: any, done: (error: any, result: any) => void) {
        const user = await this.authService.validateUser(token);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}