import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Project } from '../entities';
import { User } from '../../users/entities';
import { UserDto } from '../../users/dtos';
import { FeatureDto } from '../../features/dtos';

export class ProjectDto {
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty({ type: String, isArray: true })
    readonly users: string[];

    @ApiModelProperty({ type: String, isArray: true })
    readonly features: string[];

    @ApiModelProperty({ type: UserDto, isArray: true })
    readonly usersObj?: UserDto[];

    @ApiModelProperty({ type: FeatureDto, isArray: true })
    readonly featuresObj?: FeatureDto[];
}
