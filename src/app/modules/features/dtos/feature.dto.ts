import { ApiModelProperty } from '@nestjs/swagger';
import { Feature } from '../entities/features.entity';

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