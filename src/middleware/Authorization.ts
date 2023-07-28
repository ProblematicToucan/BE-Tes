import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { jwtPrivateKey } from '../utils/Constant';
// import { AuthenticatedRequest } from '../utils/Extension';

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

function authenticateToken(req: AuthenticatedRequest, res: Response, nex: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({error: "Unauthorized"});
    try {
        const decodedToken = jwt.verify(token, jwtPrivateKey) as {id: number}
        req.userId = decodedToken.id;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authenticateToken;