import { Router } from 'express';
import { getAll } from '../controllers/auth/auth.mjs';
const router = Router();

router.get('/', getAll);

export default router;