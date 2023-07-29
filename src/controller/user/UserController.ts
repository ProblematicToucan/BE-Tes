import { Request, Response } from 'express';
import pool from '../../db/Database';
import xlsx from 'xlsx';
import { IAuthenticatedRequest } from '../../middleware/Authorization';
import { ICreateUser, insertUser } from '../../utils/DatabaseHelper';

const queryGetUsers = "SELECT * FROM public.user";

class UserController {
    static async getUsers(req: IAuthenticatedRequest, res: Response) {
        try {
            const users = await pool.query(queryGetUsers);
            res.status(200).json({ users: users.rows, user: req.user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async importUsers(req: IAuthenticatedRequest, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const filePath = req.file.path;
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rawData = xlsx.utils.sheet_to_json<ICreateUser>(sheet);

            const data: ICreateUser[] = rawData.map((item: any) => {
                const { Nama, Username, Password } = item;
                const fullname = Nama;
                const username = Username;
                const password = Password;
                return { fullname, username, password } as ICreateUser;
              });

            for (const user of data) {
                await insertUser(user, req.user.username, req.user.username);
            }
            res.status(201).json({ message: 'user imported' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to import users', log: error });
        }
    }
}

export default UserController;
