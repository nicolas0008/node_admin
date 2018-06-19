import { ReflectMetadata } from '@nestjs/common';

/**
 * Saves on the metadata the roles allowed to execute the action
 *
 * @param {...string[]} roles Array of roles to save
 */
export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);

/**
 * Helper with string for decorators used in roles
 *
 * @abstract
 * @class RoleType
 */
export abstract class RoleType {
    static readonly Admin = 'Admin';
    static readonly Translator = 'Translator';
}