import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateTermmedDTO {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsInt()
    readonly age: number;

    @ApiModelProperty()
    @IsString()
    readonly breed: string;
  }