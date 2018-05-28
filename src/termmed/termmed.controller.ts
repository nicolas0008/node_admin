import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { TermmedService } from './termmed.service';
import { CreateTermmedDTO } from './dto/create-termmed.dto';
import { Termmed } from './interfaces/termmed.interface';

@Controller('Termmed')
export class TermmedController {
    constructor(private readonly termmedService: TermmedService) { }

    @Post()
    @ApiOperation({ title: 'Create termmed' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createTermmedDTO: CreateTermmedDTO) {
        this.termmedService.create(createTermmedDTO);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Termmed {
      return this.termmedService.findOne(+id);
    }
}
