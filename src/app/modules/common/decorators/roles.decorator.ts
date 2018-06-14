import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);

export abstract class RoleType {
    static readonly Admin = 'Admin';
    static readonly Translator = 'Translator';
}