import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {fanRepository} from '../repositories/index.js' 
import Fan from '../models/Fan.js'

async function getAllFans(req, res) {
    let {searchString = ''} = req.query
    try{
        let filteredFans = await fanRepository.getAllFans({
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Get all fans successfully',
            searchString,
            data: filteredFans,
        })
    } catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

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

async function toggleFanStatus(req, res) {
    const fanId = req.params.id;
    const fan = await fanRepository.toggleFanStatus(fanId);
    debugger
    if (fan) {
        res.status(HttpStatusCode.OK).json({
            message: 'Toggle fan successfully',
            data: fan
        })
    } else {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: `Does not exists fan with id: ${fanId}` });
    }
}

export default{
    getAllFans,
    insertFan,
    toggleFanStatus,
}