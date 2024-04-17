import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {lightRepository} from '../repositories/index.js' 
import Light from '../models/Light.js'
import Record from '../models/Record.js'

async function insertLight(req, res) {
    try {
        const light = await lightRepository.insertLight(req.body)
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert light successfully',
            data: light
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert light:'+exception,
            validationErros: exception.validationErrors
        })
    }
}

export default{
    insertLight,
}