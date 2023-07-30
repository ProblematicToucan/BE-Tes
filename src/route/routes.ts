import { Router } from 'express';
import authRouter from './auth/AuthRoute';
import userRouter from './user/UserRoute';
import gisRouter from './gis/GisRoute';


const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/gis', gisRouter);

export default router;