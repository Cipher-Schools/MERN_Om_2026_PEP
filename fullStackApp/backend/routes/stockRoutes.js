import express from 'express';
import { searchStock } from '../controllers/stockControllers.js';

const router = express.Router();

router.get('/search/:symbol', searchStock)

export default router;