import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    @IsString()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;

    @ApiModelProperty()
    @IsString()
    readonly firstName: string;

    @ApiModelProperty()
    @IsString()
    readonly lastName: string;

    @ApiModelProperty()
    @IsString()
    readonly userName: string;
}
