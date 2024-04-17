import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {fanRepository} from '../repositories/index.js' 
import Fan from '../models/Fan.js'
import Record from '../models/Record.js'

async function insertFan(req, res) {
    try {
        const fan = await fanRepository.insertFan(req.body)
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert fan successfully',
            data: fan
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert fan:'+exception,
            validationErros: exception.validationErrors
        })
    }
}

async function updateSpeed(req, res) {
    try {
        const fan = await fanRepository.updateSpeed(req.body)

        res.status(HttpStatusCode.OK).json({
            message: 'Update speed fan successfully',
            data: fan
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot update speed: '+exception.message,

        })
    }
}

export default{
    insertFan,
    updateSpeed
}