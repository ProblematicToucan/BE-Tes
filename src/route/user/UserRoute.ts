import { Router } from 'express';
import authenticateToken from '../../middleware/Authorization';
import UserController from '../../controller/user/UserController';

// end point /users
const userRouter = Router();

userRouter.get('/', authenticateToken, UserController.getUsers);

export default userRouter;