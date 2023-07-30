import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { IUser } from '../models/UserModel';
import { updateLoginTimestamp } from '../utils/DatabaseHelper';

export interface IAuthenticatedRequest extends Request {
    user: IUser;
}

async function authenticateToken(req: IAuthenticatedRequest, res: Response, nex: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY) as IUser
        await updateLoginTimestamp(decodedToken);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    nex();
}

export default authenticateToken;