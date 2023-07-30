import { QueryResult } from "pg";
import pool from "../db/Database";
import { ICreateUser, IUser } from "../models/UserModel";

const queryAddUser = "INSERT INTO public.user (fullname, username, password, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW());";
const queryLoginTimestamp = "UPDATE public.user SET last_login = NOW(), updated_by = $1 WHERE username = $1";
const checkUserQuery = 'SELECT * FROM public.user WHERE username = $1';

export async function addUser({ fullname, username, password }: ICreateUser, createdBy: string, updatedBy: string): Promise<void> {
    await pool.query(queryAddUser, [fullname, username, password, createdBy, updatedBy]);
}

export async function updateLoginTimestamp(user: IUser): Promise<void> {
    await pool.query(queryLoginTimestamp, [user.username]);
}

export async function checkExistingUser(checkUserValues: any[]): Promise<QueryResult<any>> {
    return await pool.query(checkUserQuery, checkUserValues);
}