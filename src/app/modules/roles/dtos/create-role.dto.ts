import { IsString, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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

    @ApiModelProperty({ type: String, isArray: true })
    @IsArray()
    readonly features: string[];
}
