import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {doorRepository} from '../repositories/index.js' 
import Door from '../models/Door.js'

async function getAllDoors(req, res) {
    debugger
    let {searchString = ''} = req.query
    try{
        let filteredDoors = await doorRepository.getAllDoors({
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Get all doors successfully',
            searchString,
            data: filteredDoors,
        })
    } catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

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

async function toggleDoorStatus(req, res) {
    const doorId = req.params.id;
    const door = await doorRepository.toggleDoorStatus(doorId);
    debugger
    if (door) {
        res.status(HttpStatusCode.OK).json({
            message: 'Toggle door successfully',
            data: door
        })
    } else {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: `Does not exists door with id: ${doorId}` });
    }
}

export default{
    getAllDoors,
    toggleDoorStatus,
    insertDoor,
}