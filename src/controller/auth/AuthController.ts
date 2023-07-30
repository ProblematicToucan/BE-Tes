import { Request, Response, response } from 'express';
import pool from '../../db/Database';
import { jwtToken, jwtVerify } from '../../utils/JwtHelper';
import { checkExistingUser, addUser, updateLoginTimestamp } from '../../utils/DatabaseHelper';
import { ICreateUser } from '../../models/UserModel';

const queryAuth = "SELECT * FROM public.user WHERE username=$1 AND password=$2";

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const { rows } = await pool.query(queryAuth, [username, password]);

            if (rows.length === 0) {
                return res.status(401).json({ status: "Incorrect username or password" })
            }

            await updateLoginTimestamp(rows[0]);

            const tokens = await jwtToken(rows[0]);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.status(200).json(tokens);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async refresh(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return res.status(401).json({ error: "Null refresh token cookie" });
            }

            try {
                const user = await jwtVerify(refreshToken);
                const tokens = await jwtToken(user);

                await updateLoginTimestamp(user);
                res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
                res.status(200).json(tokens);
            } catch (error) {
                res.status(401).json({ error: 'Invalid refresh token.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async register(req: Request, res: Response) {
        try {
            const { fullname, username, password } = req.body;
            if (!fullname || !username || !password) {
                return res.status(400).json({ error: 'Bad Request :(' });
            }

            const { rows: existingUsers } = await checkExistingUser([username]);

            if (existingUsers.length > 0) {
                return res.status(400).json({ error: 'Username already exists.' });
            }

            const user: ICreateUser = {
                fullname,
                username,
                password,
            };

            await addUser(user, 'register', user.username);
            res.status(201).json({ message: 'user created' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }
}

export default AuthController;