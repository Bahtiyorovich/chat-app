import { Router } from 'express';
import AuthRouter from './auth.router.mjs';

const router = Router();

router.use('/api/users', AuthRouter);

export default router;