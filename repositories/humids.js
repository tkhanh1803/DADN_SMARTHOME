import {Humid} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const isHumidUnique = async (humidName) => {
    const existingHumid = await Humid.findOne({deviceName: humidName})
    return !existingHumid;
}

const insertHumid = async({
    deviceName, deviceType, feedKey, humidity
}) => {
    const isUnique = await isHumidUnique(deviceName);
    if (isUnique){
        const humid = new Humid({
            deviceName: deviceName,
            deviceType: deviceType,
            feedKey: feedKey,
            humidity: humidity
        })
        await humid.save()
        print('insert humid successfully', OutputType.SUCCESS)
        return humid
    }
    else {
        throw new Error('Humid name already exists');
    }
    return humid
}


const updateHumid = async ({deviceName, humidity}) => {
    const humid = await Humid.findOne({deviceName: deviceName})
    debugger
    if (humidity < 0 || humidity > 100) {
        throw new Exception('Humidity is out of range')
    }       
    humid.humidity = humidity 
    await humid.save()
    return humid
}

export default {
    insertHumid,
    isHumidUnique,
    updateHumid,
}