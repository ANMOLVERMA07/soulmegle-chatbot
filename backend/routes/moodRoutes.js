import { Router } from "express";
import { getMoodResponse } from '../controller/moodController.js';

const router = Router();

// POST endpoint for mood responses
router.post('/response', getMoodResponse);


export default router;