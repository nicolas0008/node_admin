import { ApiModelProperty } from '@nestjs/swagger';
import { AuthorizedUserDto } from '../../users/dtos';

export class JWTToken {
    @ApiModelProperty()
    readonly expires_in: number;

    @ApiModelProperty()
    readonly access_token: string;

    @ApiModelProperty({ type: AuthorizedUserDto, isArray: true })
    readonly user: AuthorizedUserDto;
}
