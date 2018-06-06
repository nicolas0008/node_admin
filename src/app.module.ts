import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FeaturesModule } from './features/features.module';
import { AuthModule } from './features/authentication/auth.module';
import { UsersModule } from './features/users/users.module';

@Module({
    imports: [
        FeaturesModule
    ],
    controllers: [AppController]
})
export class AppModule { }
