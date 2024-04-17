import express from 'express'
import {
    doorController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.post('/', doorController.insertDoor)

export default router.get('/doors')