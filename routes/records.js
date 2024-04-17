import express from 'express'
import {
    recordController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.get('/', recordController.getAllRecords);

export default router.get('/records')