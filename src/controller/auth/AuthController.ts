import { Request, Response, response } from 'express';
import pool from '../../db/Database';
import { jwtToken, jwtVerify } from '../../utils/JwtHelper';

const queryAuth = "SELECT * FROM public.user WHERE username=$1 AND password=$2";
const queryTimestamp = "UPDATE public.user SET last_login = NOW() WHERE id = $1";
const queryAddUser = "INSERT INTO public.user (fullname, username, password, last_login, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, NOW(), 'register', $2, NOW(), NOW());";
const checkUserQuery = 'SELECT * FROM public.user WHERE username = $1 OR password = $2';

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const users = await pool.query(queryAuth, [username, password]);

            if (users.rows.length === 0) {
                return res.status(401).json({ status: "Incorrect username or password" })
            }

            const userId = users.rows[0].id;
            await pool.query(queryTimestamp, [userId]);

            let tokens = await jwtToken(users.rows[0]);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.status(200).json(tokens);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async refresh(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) return res.status(401).json({ error: "Null refresh token cookie" });
            try {
                const user = await jwtVerify(refreshToken);
                // const userId = user.id;
                // await pool.query(queryTimestamp, [userId]);
                const tokens = await jwtToken(user);
                res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
                res.status(200).json(tokens);
            } catch (error) {
                return res.status(401).json({ message: 'Invalid refresh token.' });
            }
        } catch (error) {
            res.status(401).json(error);
        }
    }

    static async register(req: Request, res: Response) {
        try {
            const { fullname, username, password } = req.body;
            if (!fullname || !username || !password) return res.status(400).json({ error: 'Bad Request :(' });

            // Check if the username or email already exists in the database
            const checkUserValues = [username, password];
            const { rows: existingUsers } = await pool.query(checkUserQuery, checkUserValues);

            if (existingUsers.length > 0) return res.status(400).json({ error: 'Username or email already exists.' });

            const userValues = [fullname, username, password];
            const user = await pool.query(queryAddUser, userValues);
            res.status(201).json({ created: user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }
}

export default AuthController;