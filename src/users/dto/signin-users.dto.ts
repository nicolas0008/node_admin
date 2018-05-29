import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail } from 'class-validator';

export class SignInUsersDto {
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
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;

    @ApiModelProperty()
    @IsString()
    readonly admin: false;
}