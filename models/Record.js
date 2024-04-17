import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"
export default mongoose.model('Record',
    new Schema({
        id: {type: ObjectId},
        name: {
            type: String,
            required: true,
        },
        timeStamp: {
            type: Date,
            required: true,
            default: Date.now,
        }
    })
)
