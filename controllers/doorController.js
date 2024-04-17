import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {doorRepository} from '../repositories/index.js' 
import Door from '../models/Door.js'
import Record from '../models/Record.js'


async function insertDoor(req, res) {
    try {
        const door = await doorRepository.insertDoor(req.body)
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert door successfully',
            data: door
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert door:'+exception,
            validationErros: exception.validationErrors
        })
    }
}


export default{
    insertDoor,
}