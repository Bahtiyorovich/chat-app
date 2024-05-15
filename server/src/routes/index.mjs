import { Router } from 'express';
import AuthRoutes from './auth.router.mjs';
import ChatsRoutes from './chat.router.mjs';
import MessageRoutes from './message.router.mjs';

const router = Router();

router.use('/api', AuthRoutes);
router.use('/api/chats', ChatsRoutes);
router.use('/api/messages', MessageRoutes);

export default router;