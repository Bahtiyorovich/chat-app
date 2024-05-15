import { Router } from 'express';
import { findUser, getAllUsers, login, register, logout, refreshToken } from '../controllers/auth.mjs';
const router = Router();

router.get('/users', getAllUsers);
router.get('/user/:id', findUser);
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;