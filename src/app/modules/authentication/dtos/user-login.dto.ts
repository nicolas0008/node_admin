import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @IsString()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @ApiModelProperty()
    readonly password: string;
}
