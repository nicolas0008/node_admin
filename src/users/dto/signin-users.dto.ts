import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateTermmedDTO {
    @ApiModelProperty()
    @IsString()
    readonly firstname: string;

    @ApiModelProperty()
    @IsInt()
    readonly lastname: number;

    @ApiModelProperty()
    @IsString()
    readonly username: string;

    @ApiModelProperty()
    @IsString()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;

    @ApiModelProperty()
    @IsString()
    readonly admin: false;
}