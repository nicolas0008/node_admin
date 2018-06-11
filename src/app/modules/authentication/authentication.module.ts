import { Module } from '@nestjs/common';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UsersModule } from '../users';
import { CoreModule } from '../core';
import { AuthenticationController } from './controllers';
import { JwtStrategy } from '.';

@Module({
    imports: [
        CoreModule,
        UsersModule
    ],
    providers: [
        AuthenticationService
    ],
    controllers: [
        AuthenticationController
    ]
})
export class AuthenticationModule { }
