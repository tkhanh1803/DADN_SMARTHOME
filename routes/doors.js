import express from 'express'
import {
    doorController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.get('/', doorController.getAllDoors);
router.post('/', doorController.insertDoor)
router.put('/:id/toggle', doorController.toggleDoorStatus);

export default router.get('/doors')