import { AuthorizedUser } from '../../users';

export interface JWTToken {
    readonly expires_in: number;
    readonly access_token: string;
    readonly user: AuthorizedUser;
}
