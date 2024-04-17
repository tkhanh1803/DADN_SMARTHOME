import {Temp} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const isTempUnique = async (tempName) => {
    const existingTemp = await Temp.findOne({deviceName: tempName})
    return !existingTemp;
}

const insertTemp = async({
    deviceName, deviceType, feedKey, currentTempurature
}) => {
    const isUnique = await isTempUnique(deviceName);
    if (isUnique){
        const temp = new Temp({
            deviceName: deviceName,
            deviceType: deviceType,
            feedKey: feedKey,
            currentTempurature: currentTempurature,
        })
        await temp.save()
        print('insert temp successfully', OutputType.SUCCESS)
        return temp
    }
    else {
        throw new Error('Temp name already exists');
    }
    return temp
}

const updateTemp = async ({deviceName, currentTempurature}) => {
    const temp = await Temp.findOne({deviceName: deviceName})
    
    if (currentTempurature < 0 || currentTempurature > 100) {
        throw new Exception('Current tempurature is out of range')
    }  
    
    temp.currentTempurature = currentTempurature
    await temp.save()
    return temp
}

export default {
    insertTemp,
    isTempUnique,
    updateTemp,
}