import {Entity, Column, OneToOne} from 'typeorm';

@Entity()
export class Users{
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    token: string;

    @Column()
    admin: boolean;

    @Column(type => UserDetails)
    crs: UserDetails;

    @Column(type => UserDetails)
    jira: UserDetails;
}

export class UserDetails {
    username: string;
    password: string;
}