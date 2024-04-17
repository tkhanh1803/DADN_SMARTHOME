import express from 'express'
import {
    fanController,
} from '../controllers/index.js' 

const router = express.Router();

// endpoint API for door
router.post('/', fanController.insertFan)
export default router.get('/fans')