import { ApiModelProperty } from '@nestjs/swagger';
import { Feature } from '../entities/features.entity';

/**
 * Dto to return a feature
 *
 * @class FeatureDto
 */
export class FeatureDto {
    constructor(project: Feature) {
        Object.assign(this, project);
    }

    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly description: string;
}