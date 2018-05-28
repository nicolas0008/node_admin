import { Module } from '@nestjs/common';
import { TermmedController } from './termmed.controller';
import { TermmedService } from './termmed.service';

@Module({
    controllers: [TermmedController],
    providers: [TermmedService],
})
export class TermmedModule { }