import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        forwardRef(() => UsersModule)
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [AuthService]
})
export class AuthModule { }