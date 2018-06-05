import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';

@Module({
    imports: [AuthModule, UsersModule]
})
export class FeaturesModule { }
