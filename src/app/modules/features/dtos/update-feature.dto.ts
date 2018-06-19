import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Dto to update a feature
 *
 * @class CreateFeatureDto
 */
export class UpdateFeatureDto {
    @ApiModelPropertyOptional()
    @IsString()
    readonly name?: string;

    @ApiModelPropertyOptional()
    @IsString()
    readonly description?: string;
}
