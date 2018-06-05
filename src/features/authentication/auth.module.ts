import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './Http.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    providers: [
        AuthService,
        HttpStrategy
    ]
})
export class AuthModule { }