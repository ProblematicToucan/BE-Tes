import { Request, Response } from 'express';
import pool from '../../db/Database';
import { AuthenticatedRequest } from '../../middleware/Authorization';

const queryGetUsers = "SELECT * FROM public.user";

class UserController {
    static async getUsers(req: AuthenticatedRequest, res: Response) {
        try {
            const users = await pool.query(queryGetUsers);
            res.status(200).json({ users: users.rows, user: req.user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }
}

export default UserController;
