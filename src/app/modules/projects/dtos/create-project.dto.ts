import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateProjectDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly description: string;

    @ApiModelPropertyOptional({ type: String, isArray: true })
    @IsArray()
    readonly users?: string[];

    @ApiModelPropertyOptional({ type: String, isArray: true })
    @IsArray()
	readonly features?: string[];
}
