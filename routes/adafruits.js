import express from 'express'
import {
    adafruitController,
} from '../controllers/index.js'

const router = express.Router();

// endpoint API for door
router.post('/post', adafruitController.postValueToAdafruit)
router.post('/post/toggle', adafruitController.postToggleToAdafruit)
router.get('/get', adafruitController.getFromAdafruit)
router.get('/get-all', adafruitController.getDeviceHistoryByFeedKey);
export default router.get('/adafruits')