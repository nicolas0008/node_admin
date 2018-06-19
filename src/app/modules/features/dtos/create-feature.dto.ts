import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Dto to create a new feature
 *
 * @class CreateFeatureDto
 */
export class CreateFeatureDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly description: string;
}
