import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateRoleDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly description: string;

    @ApiModelProperty()
    @IsString()
    readonly projectId: string;

    @ApiModelPropertyOptional({ type: String, isArray: true })
    @IsArray()
    readonly features?: string[];
}
