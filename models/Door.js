import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"

export default mongoose.model('Door',
    new Schema({
        id: {type: ObjectId},
        name: {
            type: String,
            required: true,
        },
        isOpened: {
            type: Boolean,
            required: true,
        },
    })
)
