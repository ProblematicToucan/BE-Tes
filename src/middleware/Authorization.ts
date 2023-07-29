import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { IUserPayload } from '../utils/JwtHelper';
import pool from '../db/Database';

const queryTimestamp = "UPDATE public.user SET last_login = NOW() WHERE id = $1";

export interface IAuthenticatedRequest extends Request {
    user: IUserPayload;
}

async function authenticateToken(req: IAuthenticatedRequest, res: Response, nex: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY) as IUserPayload
        const userId = decodedToken.id;
        await pool.query(queryTimestamp, [userId]);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    nex();
}

export default authenticateToken;