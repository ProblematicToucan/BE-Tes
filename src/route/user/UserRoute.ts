import { Router } from 'express';
import authenticateToken from '../../middleware/Authorization';
import UserController from '../../controller/user/UserController';
import multer from 'multer';

// end point /users
const userRouter = Router();
const upload = multer({ dest: __dirname + '/uploads' });

userRouter.get('/', authenticateToken, UserController.getUsers);
userRouter.post('/import', authenticateToken, upload.single('file'), UserController.importUsers);

export default userRouter;