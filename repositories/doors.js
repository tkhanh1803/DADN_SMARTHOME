import {Door} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const isDoorUnique = async (doorName) => {
    const existingDoor = await Door.findOne({deviceName: doorName})
    return !existingDoor;
}

const insertDoor = async({
    deviceName, deviceType, feedKey, isOpened
}) => {
    const isUnique = await isDoorUnique(deviceName);
    if (isUnique){
        const door = new Door({
            deviceName: deviceName,
            deviceType: deviceType,
            feedKey: feedKey,
            isOpened: isOpened,
        })
        await door.save()
        print('insert door successfully', OutputType.SUCCESS)
        return door
    }
    else {
        throw new Exception('Door name already exists');
    }
    return door
}

const toggleDoorStatus = async (deviceName) => {
    const door = await Door.findOne({deviceName: deviceName});
    if (!door) {
        return
    }
    door.isOpened = 1 - door.isOpened;
    await door.save();
    return door    
};


export default{
    insertDoor,
    toggleDoorStatus,
}
