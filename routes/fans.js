import express from 'express'
import {
    fanController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.get('/', fanController.getAllFans);
router.post('/', fanController.insertFan)
router.put('/:id/toggle', fanController.toggleFanStatus);

export default router.get('/fans')