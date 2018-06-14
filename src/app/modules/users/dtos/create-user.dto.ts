import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsString()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    readonly password: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly firstName?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly lastName?: string;

    @ApiModelProperty()
    @IsString()
    readonly userName: string;

    @ApiModelPropertyOptional({ type: String, isArray: true})
    @IsArray()
    readonly roles?: string[];
}
