import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationService } from './services';
import { AuthenticationController } from './controllers';

/**
 * Authentication module
 *
 * @class AuthenticationModule
 */
@Module({
    imports: [
        SharedModule,
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
