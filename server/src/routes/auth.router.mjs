import { Router } from 'express';
import { findUser, getAllUsers, login, register } from '../controllers/auth/auth.mjs';
const router = Router();

router.get('/', getAllUsers);
router.get('/find/:id', findUser);
router.post('/register', register);
router.post('/login', login);

export default router;