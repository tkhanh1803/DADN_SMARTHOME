import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {lightRepository} from '../repositories/index.js' 
import Light from '../models/Light.js'

async function getAllLights(req, res) {
    let {searchString = ''} = req.query
    try{
        let filteredLights = await lightRepository.getAllLights({
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Get all lights successfully',
            searchString,
            data: filteredLights,
        })
    } catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

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

async function toggleLightStatus(req, res) {
    const lightId = req.params.id;
    const light = await lightRepository.toggleLightStatus(lightId);
    if (light) {
        res.status(HttpStatusCode.OK).json({
            message: 'Toggle light successfully',
            data: light
        })
    } else {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: `Does not exists fan with id: ${lightId}` });
    }
}

export default{
    getAllLights,
    insertLight,
    toggleLightStatus,
}