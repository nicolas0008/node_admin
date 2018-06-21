import { Module } from '@nestjs/common';

import { SharedModule } from './app/shared/shared.module';
import { UsersModule } from './app/modules/users/users.module';
import { FeaturesModule } from './app/modules/features/features.module';
import { RolesModule } from './app/modules/roles/roles.module';
import { AuthenticationModule } from './app/modules/authentication/authentication.module';
import { ProjectsModule } from './app/modules/projects/projects.module';
import { JwtStrategy } from './app/modules/authentication/passport/jwt.strategy';

/**
 * App Module
 *
 * @export
 * @class AppModule
 */
@Module({
    imports: [
        SharedModule,
        UsersModule,
        FeaturesModule,
        AuthenticationModule,
        RolesModule,
        ProjectsModule
    ],
    providers: [
        JwtStrategy
    ]
})
export class AppModule { }
