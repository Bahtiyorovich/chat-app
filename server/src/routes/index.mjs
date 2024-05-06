import { Router } from 'express';
import AuthRouter from './auth.router.mjs';

const router = Router();

router.use('/api', AuthRouter);

export default router;