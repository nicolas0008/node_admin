import { Module } from '@nestjs/common';

import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module';
import { FeaturesModule } from './modules/features/features.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
    imports: [
        CoreModule,
        UsersModule,
        FeaturesModule,
        AuthenticationModule,
        RolesModule
    ]
})
export class AppModule { }
