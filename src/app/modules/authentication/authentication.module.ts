import { Module } from '@nestjs/common';

import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from '../users';
import { CoreModule } from '../core';

@Module({
    imports: [
        CoreModule,
        UsersModule
    ],
    providers: [
        AuthenticationService,
        JwtStrategy
    ],
    controllers: [
        AuthenticationController
    ],
})
export class AuthenticationModule { }
