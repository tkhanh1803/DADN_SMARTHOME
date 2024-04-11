import express from 'express'
import {
    lightController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.get('/', lightController.getAllLights);
router.post('/', lightController.insertLight)
router.put('/:id/toggle', lightController.toggleLightStatus);

export default router.get('/lights')