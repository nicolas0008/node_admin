import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

/**
 * DTO to update a role
 *
 * @class UpdateRoleDto
 */
export class UpdateRoleDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly name: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly description: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly projectId: string;

    @ApiModelPropertyOptional({ type: String, isArray: true })
    @IsArray()
    readonly features?: string[];
}
