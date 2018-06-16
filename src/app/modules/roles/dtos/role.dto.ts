import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { FeatureDto } from '../../features/dtos';

export class RoleDto {
    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly projectId: string;

    @ApiModelProperty({ type: String, isArray: true })
    readonly features: string[];

    @ApiModelPropertyOptional({ type: FeatureDto, isArray: true })
    readonly featuresObj?: FeatureDto[];
}
