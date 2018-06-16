import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { RoleDto } from '../../roles/dtos';

export class UserDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelPropertyOptional()
    readonly firstName: string;

    @ApiModelPropertyOptional()
    readonly lastName: string;

    @ApiModelProperty()
    readonly userName: string;

    @ApiModelPropertyOptional({ type: String, isArray: true })
    readonly roles: string[];

    @ApiModelPropertyOptional({ type: RoleDto, isArray: true })
    readonly rolesObj: RoleDto[];

    @ApiModelPropertyOptional()
    readonly id: string;

    @ApiModelPropertyOptional()
    readonly admin: boolean;
}
