import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {recordRepository} from '../repositories/index.js' 
import Record from '../models/Record.js'

async function getAllRecords(req, res) {
    try{
        let filteredRecords = await recordRepository.getAllRecords()
        res.status(HttpStatusCode.OK).json({
            message: 'Get all records successfully',
            data: filteredRecords,
        })
    } catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

export default{
    getAllRecords,
}