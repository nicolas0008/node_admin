import { ApiModelProperty } from '@nestjs/swagger';
import { RoleDto } from '../../roles/dtos';
import { User } from '../entities';

export class AuthorizedUserDto {
    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.rolesObj = user.rolesObj;
    }

    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty({ type: RoleDto, isArray: true })
    rolesObj: RoleDto[];
}
