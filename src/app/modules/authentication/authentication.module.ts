import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { CoreModule } from '../core/core.module';
import { AuthenticationService } from './services';
import { AuthenticationController } from './controllers';

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
