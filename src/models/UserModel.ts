export interface IUser {
    id: number;
    fullname: string;
    username: string;
}

export interface ICreateUser {
    fullname: string;
    username: string;
    password: string;
}
