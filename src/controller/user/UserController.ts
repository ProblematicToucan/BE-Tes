import { Request, Response } from 'express';
import pool from '../../db/Database';
import { queryGetUsers } from './UserControllerQueries';

class UserController {

    /**
     * Http get - Mendapatkan semua user pada tabel user.
     * @param req request body.
     * @param res response body.
     */
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await pool.query(queryGetUsers);
            res.status(200).json({users : users.rows, reqId: req});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default UserController;
