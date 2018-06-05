import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/classes/signin.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(token: string): Promise<any> {
        // const users = this.usersService.search(token);
        return { email: 'nicolas@termmed.com', userName: 'Ntillet', password: 'nicolas' };
      }
}