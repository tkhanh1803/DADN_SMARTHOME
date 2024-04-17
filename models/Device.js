import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"

export default mongoose.model('Device',
    new Schema({
        id: {type: ObjectId},
        deviceName: {
            type: String,
            required: true,
        },
        deviceType: {
            type: String,
            values: ["Fan","Led","Humid","Temp","Door"],
            required: true,
        },
        feedKey: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    })
)
