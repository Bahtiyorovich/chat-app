import { Router } from 'express';
import { createMessage, getMessage } from '../controllers/messageController.mjs';

const router = Router();

router.post('/', createMessage);
router.get('/:chatId', getMessage);

export default router;






