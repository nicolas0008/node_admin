import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProjectDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly name?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly description?: string;
}
