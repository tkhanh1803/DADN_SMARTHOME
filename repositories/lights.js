import {Light} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const isLightUnique = async (lightName) => {
    const existingLight = await Light.findOne({deviceName: lightName})
    return !existingLight;
}

const insertLight = async({
    deviceName, deviceType, feedKey, color
}) => {
    const isUnique = await isLightUnique(deviceName);
    if (isUnique){
        const light = new Light({
            deviceName: deviceName,
            deviceType: deviceType,
            feedKey: feedKey,
            color: color,
        })
        await light.save()
        print('insert light successfully', OutputType.SUCCESS)
        return light
    }
    else {
        throw new Error('Light name already exists');
    }
    return light
}

const toggleLightStatus = async (deviceName) => {

    const light = await Light.findOne({deviceName: deviceName});
    if (!light) {
        return
    }
    if (light.color == "#000000") light.color = "#123456"
    else light.color = "#000000"
    await light.save();
    return light
};

const updateColor = async ({deviceName, color}) => {
    const light = await Light.findOne({deviceName: deviceName})
    var regex = /^#[0-9a-f]{6}$/
    if (!(regex.test(color))) {
        throw new Exception('Color is not supported')
    }       
    light.color = color 
    await light.save()
    return light
}

export default{
    updateColor,
    insertLight,
    toggleLightStatus,
}
