import { ESIndex } from '../../common/decorators';
import { Role } from '../../roles/entities';

/**
 * User entity
 *
 * @class User
 */
@ESIndex('users')
export class User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    admin: boolean;
    roles: string[];
    rolesObj: Role[];
    id: string;

    /**
     * Compares the user password with the password received as parameter
     *
     * @param {string} password
     * @returns {boolean} true if the password matches
     * @memberof User
     */
    comparePassword? = (password: string): boolean => {
        return this.password === password;
    }

    /**
     * Compares the user roles with the ones sent
     *
     * @param {string} password
     * @returns {boolean} true if has any role
     * @memberof User
     */
    hasRoles? = (role: string[]): boolean => {
        if (this.rolesObj) {
            return this.rolesObj.some(r => role.indexOf(r.name) >= 0);
        }
        return false;
    }
}