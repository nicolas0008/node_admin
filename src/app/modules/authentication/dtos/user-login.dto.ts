import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @ApiModelProperty()
    readonly password: string;
}
