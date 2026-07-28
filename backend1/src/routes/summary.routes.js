import { Router } from 'express';
import { createSummary, getSummary } from '../controllers/summary.controller.js';

const router = Router();

router.post('/:videoId', createSummary);
router.get('/:videoId', getSummary);

export default router;
