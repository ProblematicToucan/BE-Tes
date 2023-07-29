import { QueryResult } from "pg";
import pool from "../db/Database";
import { IUserPayload } from "./JwtHelper";

const queryAddUser = "INSERT INTO public.user (fullname, username, password, last_login, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, NOW(), $4, $5, NOW(), NOW());";
const queryLoginTimestamp = "UPDATE public.user SET last_login = NOW(), updated_by = $1 WHERE id = $2";
const checkUserQuery = 'SELECT * FROM public.user WHERE username = $1';

export interface ICreateUser {
    fullname: string,
    username: string,
    password: string
}

export async function insertUser({ fullname, username, password }: ICreateUser, createdBy: string, updatedBy: string): Promise<void> {
    await pool.query(queryAddUser, [fullname, username, password, createdBy, updatedBy]);
  }

export async function updateLoginTimestamp(user: IUserPayload): Promise<void> {
    await pool.query(queryLoginTimestamp, [user.username, user.id]);
}

export async function checkExistingUser(checkUserValues: any[]): Promise<QueryResult<any>> {
    return await pool.query(checkUserQuery, checkUserValues);
}