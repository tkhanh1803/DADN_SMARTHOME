import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {humidRepository} from '../repositories/index.js' 
import Humid from '../models/Humid.js'
import Record from '../models/Record.js'

async function insertHumid(req, res) {
    try {
        const humid = await humidRepository.insertHumid(req.body)
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert humid successfully',
            data: humid
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert humid:'+exception,
            validationErros: exception.validationErrors
        })
    }
}


async function updateHumid(req, res) {
    const {
        name,
        humidity,
    } = req.body
    try {
        const humid = await humidRepository.updateHumid(req.body)

        res.status(HttpStatusCode.OK).json({
            message: 'Update humidity successfully',
            data: humid
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot update humidity: '+exception.message,

        })
    }
}

export default{
    updateHumid,
    insertHumid,
}