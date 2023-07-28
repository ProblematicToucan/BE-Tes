import { Router } from 'express';
import UserController from './controller/user/UserController';
import AuthController from './controller/auth/AuthController';
import authenticateToken from './middleware/Authorization';


const router = Router();

router.get('/users', authenticateToken, UserController.getUsers);
router.post('/login', AuthController.authLogin);

export default router;