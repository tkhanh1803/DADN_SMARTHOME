import {Door} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const getAllDoors = async({
    searchString,
}) => {
    let filteredDoors = await Door.aggregate([
        {$match: {
            $or: [
                {
                    name: {$regex: `.*${searchString}.*`, $options: 'i'} // ignore case
                },
            ]
        },},
    ])
    
    return filteredDoors
}

const isDoorUnique = async (doorName) => {
    const existingDoor = await Door.findOne({name: doorName})
    return !existingDoor;
}

const insertDoor = async({
    name,
    isOpened,
}) => {
    const isUnique = await isDoorUnique(name);
    if (isUnique){
        const door = new Door({
            name,
            isOpened,
        })
        await door.save()
        print('insert door successfully', OutputType.SUCCESS)
        return door
    }
    else {
        throw new Error('Door name already exists');
    }
    return door
}

const toggleDoorStatus = async (doorId) => {
    try {
        const door = await Door.findById(doorId);
        if (!door) {
            throw new Error('Door not found');
        }
        door.isOpened = !door.isOpened;
        await door.save();
        return door
    } catch (error) {
        throw new Error('Error toggling door status: ' + error.message);
    }
};


export default{
    getAllDoors,
    insertDoor,
    toggleDoorStatus,
}
