import { Router } from 'express';
import { createChat, findChat, findUserChats } from '../controllers/chatController.mjs';

const router = Router();

router.post('/', createChat);
router.get('/:userId', findUserChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;