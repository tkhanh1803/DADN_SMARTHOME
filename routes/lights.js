import express from 'express'
import {
    lightController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.post('/', lightController.insertLight)

export default router.get('/lights')