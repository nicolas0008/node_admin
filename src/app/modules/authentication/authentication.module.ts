import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { CoreModule } from '../core/core.module';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';

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
