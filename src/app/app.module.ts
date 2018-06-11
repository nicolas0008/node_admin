import { Module } from '@nestjs/common';

import { AuthenticationModule } from './modules/authentication';
import { CommonModule } from './modules/common/common.module';
import { CoreModule } from './modules/core';
import { UsersModule } from './modules/users';

@Module({
    imports: [
        AuthenticationModule,
        CommonModule,
        CoreModule,
        UsersModule
    ]
})
export class AppModule { }
