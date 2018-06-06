import { Module, forwardRef } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../authentication/auth.module';

@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository
    ],
    exports: [UsersService]
})
export class UsersModule { }
