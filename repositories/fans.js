import {Fan} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"
import {Device} from '../models/index.js'


const isFanUnique = async (deviceName) => {
    const existingFan = await Fan.findOne({deviceName: deviceName})
    return !existingFan;
}

const insertFan = async({
    deviceName, deviceType, feedKey, speed
}) => {
    const isUnique = await isFanUnique(deviceName);
    if (isUnique){
        const fan = new Fan({
            deviceName: deviceName,
            deviceType: deviceType,
            feedKey: feedKey,
            speed: speed,
        })
        await fan.save()
        print('insert fan successfully', OutputType.SUCCESS)
        return fan
    }
    else {
        throw new Error('Fan name already exists');
    }
    return fan
}

const updateSpeed = async ({deviceName, speed}) => {
    const fan = await Fan.findOne({deviceName: deviceName})
    
    if (speed < 0 || speed > 100) {
        throw new Exception('Cannot update speed: Speed is out of range')
    }       
    else{
        fan.speed = speed
        await fan.save()
        return fan
    }
}


export default{
    insertFan,
    updateSpeed,
}
