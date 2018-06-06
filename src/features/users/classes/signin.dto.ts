import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsBoolean } from 'class-validator';

export class UserDto {
    @ApiModelProperty()
    @IsString()
    readonly firstName?: string;

    @ApiModelProperty()
    @IsString()
    readonly lastName?: string;

    @ApiModelProperty()
    @IsString()
    readonly userName: string;

    @ApiModelProperty()
    @IsEmail()
    readonly email?: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;

    @ApiModelProperty()
    @IsBoolean()
    readonly admin?: boolean;

    iat?: number;
    exp?: number;
}