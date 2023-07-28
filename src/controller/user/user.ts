import { Request, Response } from 'express';
import pool from '../../db/database'
import { queryGetUsers } from './queries';

class UserController {

    /**
     * Http get - Mendapatkan semua user pada tabel user.
     * @param req request body.
     * @param res response body.
     */
    static getUsers(req: Request, res: Response) {
        pool.query(queryGetUsers, (error, result) => {
            if (error) throw error;
            res.status(200).json(result.rows);
        })
    }
}

export default UserController;
