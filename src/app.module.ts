import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TermmedModule } from './termmed/termmed.module';

@Module({
    imports: [TermmedModule],
    controllers: [AppController],
})
export class AppModule { }
