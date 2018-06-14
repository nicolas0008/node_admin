import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateFeatureDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly name?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly description?: string;
}
