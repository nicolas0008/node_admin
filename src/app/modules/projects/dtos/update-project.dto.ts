import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class UpdateProjectDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly name?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly description?: string;

    @ApiModelPropertyOptional({ type: String, isArray: true })
    @IsArray()
    readonly users?: string[];

    @ApiModelPropertyOptional({ type: String, isArray: true })
    @IsArray()
	readonly features?: string[];
}
