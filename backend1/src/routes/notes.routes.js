import { Router } from 'express';
import { listNotes } from '../controllers/notes.controller.js';

const router = Router();

router.get('/', listNotes);

export default router;
