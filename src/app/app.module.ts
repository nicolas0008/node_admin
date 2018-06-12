import { Module } from '@nestjs/common';

import { CommonModule } from './modules/common/common.module';
import { AuthenticationModule, JwtStrategy } from './modules/authentication';
import { CoreModule } from './modules/core';
import { UsersModule } from './modules/users';
import { FeaturesModule } from './modules/features';
import { RolesModule } from './modules/roles';

@Module({
    imports: [
        CommonModule,
        CoreModule,
        UsersModule,
        FeaturesModule,
        AuthenticationModule,
        RolesModule
    ],
    providers: [
        JwtStrategy
    ],
})
export class AppModule { }
