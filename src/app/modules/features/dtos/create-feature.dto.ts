import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly description: string;
}
