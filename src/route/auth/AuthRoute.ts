import { Router } from 'express';
import AuthController from '../../controller/auth/AuthController';

// end point /auth
const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.get('/refresh', AuthController.refresh);
authRouter.post('/register', AuthController.register);

export default authRouter;