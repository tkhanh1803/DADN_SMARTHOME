import {Light} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const getAllLights = async({
    searchString,
}) => {
    let filteredLights = await Light.aggregate([
        {$match: {
            $or: [
                {
                    name: {$regex: `.*${searchString}.*`, $options: 'i'} // ignore case
                },
            ]
        },},
    ])
    
    return filteredLights
}

const isLightUnique = async (lightName) => {
    const existingLight = await Light.findOne({name: lightName})
    return !existingLight;
}

const insertLight = async({
    name,
    isOpened,
}) => {
    const isUnique = await isLightUnique(name);
    if (isUnique){
        const light = new Light({
            name,
            isOpened,
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

const toggleLightStatus = async (lightId) => {
    try {
        const light = await Light.findById(lightId);
        if (!light) {
            throw new Error('Light not found');
        }
        light.isOpened = !light.isOpened;
        await light.save();
        return light
    } catch (error) {
        throw new Error('Error toggling light status: ' + error.message);
    }
};


export default{
    getAllLights,
    insertLight,
    toggleLightStatus,
}
