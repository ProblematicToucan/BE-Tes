import { Router } from 'express';
import UserController from './controller/user/user';

const router = Router();

router.get('/', UserController.getUsers)

export default router;