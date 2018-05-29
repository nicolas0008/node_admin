import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TermmedModule } from './termmed/termmed.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TermmedModule, UsersModule],
    controllers: [AppController],
})
export class AppModule { }
