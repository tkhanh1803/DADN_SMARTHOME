import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {tempRepository} from '../repositories/index.js' 
import Temp from '../models/Temp.js'
import Record from '../models/Record.js'

async function insertTemp(req, res) {
    try {
        const temp = await tempRepository.insertTemp(req.body)
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert temp successfully',
            data: temp
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert temp:'+exception,
            validationErros: exception.validationErrors
        })
    }
}

async function updateTemp(req, res) {
    const {
        name,
        currentTemp,
    } = req.body
    try {
        const temp = await tempRepository.updateTemp(req.body)

        res.status(HttpStatusCode.OK).json({
            message: 'Update current tempurature successfully',
            data: temp
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot update current tempurature: '+exception.message,

        })
    }
}

export default{
    insertTemp,
    updateTemp,
}