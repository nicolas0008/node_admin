export interface Users{
    readonly firstName: string,
    readonly lastName: string,
    readonly username: string,
    readonly email: string,
    readonly password: string,
    readonly token: string,
    readonly admin: boolean,
    readonly crs: {
        readonly username: String,
        readonly password: String
    },
    readonly jira: {
        readonly username: String,
        readonly password: String
    }

}





