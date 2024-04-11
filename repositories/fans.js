import {Fan} from '../models/index.js' 
// import {faker} from '@faker-js/faker'
import Exception from '../exceptions/Exception.js'
import {print, OutputType} from "../helpers/print.js"

const getAllFans = async({
    searchString,
}) => {
    let filteredFans = await Fan.aggregate([
        {$match: {
            $or: [
                {
                    name: {$regex: `.*${searchString}.*`, $options: 'i'} // ignore case
                },
            ]
        },},
    ])
    
    return filteredFans
}

const isFanUnique = async (fanName) => {
    const existingFan = await Fan.findOne({name: fanName})
    return !existingFan;
}

const insertFan = async({
    name,
    isOpened,
}) => {
    const isUnique = await isFanUnique(name);
    if (isUnique){
        const fan = new Fan({
            name,
            isOpened,
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

const toggleFanStatus = async (fanId) => {
    try {
        const fan = await Fan.findById(fanId);
        if (!fan) {
            throw new Error('Fan not found');
        }
        fan.isOpened = !fan.isOpened;
        await fan.save();
        return fan
    } catch (error) {
        throw new Error('Error toggling fan status: ' + error.message);
    }
};


export default{
    getAllFans,
    insertFan,
    toggleFanStatus,
}
