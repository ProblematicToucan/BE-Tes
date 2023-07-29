import { Router } from 'express';
import authRouter from './auth/AuthRoute';
import userRouter from './user/UserRoute';


const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;