import express from 'express'
import {
    tempController,
} from '../controllers/index.js'
import axios from "axios"

const router = express.Router();

// endpoint API for door  
router.post('/', tempController.insertTemp)

export default router.get('/temps')