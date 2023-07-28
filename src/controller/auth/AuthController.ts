import { Request, Response, response } from 'express';
import pool from '../../db/Database';
import jwt from 'jsonwebtoken';
import { queryAuth } from './AuthControllerQueries';
import jwtToken from '../../utils/JwtHelper';

class AuthController {
    static async authLogin(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const users = await pool.query(queryAuth, [username, password]);

            if (users.rows.length === 0) {
                res.status(401).json({ status: "Incorrect username or password" })
            } else {
                let tokens = jwtToken(users.rows[0]);
                res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
                res.status(200).json(tokens);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default AuthController;