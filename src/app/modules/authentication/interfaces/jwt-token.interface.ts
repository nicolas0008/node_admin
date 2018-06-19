import { ApiModelProperty } from '@nestjs/swagger';
import { AuthorizedUserDto } from '../../users/dtos';

/**
 * Token returned from the endpoint with the authorized user
 *
 * @class JWTToken
 */
export class JWTToken {
    @ApiModelProperty()
    readonly expires_in: number;

    @ApiModelProperty()
    readonly access_token: string;

    @ApiModelProperty({ type: AuthorizedUserDto })
    readonly user: AuthorizedUserDto;
}
