import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import * as passport from 'passport';
import { AuthorizedUser } from '../../users';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            // No roles on decorator
            return true;
        }
        const user: AuthorizedUser = context.switchToHttp().getRequest().user;
        return user.hasRoles(roles);
    }
}
