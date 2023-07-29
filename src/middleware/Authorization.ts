import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { UserPayload } from '../utils/JwtHelper';
import pool from '../db/Database';

const queryTimestamp = "UPDATE public.user SET last_login = NOW() WHERE id = $1";

export interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}

async function authenticateToken(req: AuthenticatedRequest, res: Response, nex: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY) as UserPayload
        const userId = decodedToken.id;
        await pool.query(queryTimestamp, [userId]);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    nex();
}

export default authenticateToken;