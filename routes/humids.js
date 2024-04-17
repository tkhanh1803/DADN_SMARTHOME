import express from 'express'
import {
    humidController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.post('/', humidController.insertHumid)

export default router.get('/humids')