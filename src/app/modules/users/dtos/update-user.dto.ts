import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

/**
 * DTO to update an user
 *
 * @export
 * @class UpdateUserDto
 */
export class UpdateUserDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly email?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly password?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly firstName?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly lastName?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly userName?: string;

    @ApiModelPropertyOptional({ type: String, isArray: true})
    @IsArray()
    readonly roles?: string[];
}