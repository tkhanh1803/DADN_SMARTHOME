import {Record} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const getAllRecords = async() => {
    try {
        const records = await Record.find();
        return records;
    } catch (error) {
        throw new Error(`Error getting records: ${error}`);
    }
}

export default {
    getAllRecords,
}