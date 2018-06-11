import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';
import { AuthenticationModule, AuthenticationService, JwtStrategy } from './modules/authentication';
import { CoreModule } from './modules/core';
import { UsersModule } from './modules/users';
import { FeaturesModule } from './modules/features';

@Module({
    imports: [
        CommonModule,
        CoreModule,
        UsersModule,
        FeaturesModule,
        AuthenticationModule
    ],
    providers: [
        JwtStrategy
    ],
})
export class AppModule { }
