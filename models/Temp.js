
import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"
import Device from "./Device.js"

const TempSchema = new Schema({
    currentTempurature: {
        type: Number,
        required: true,
        validator: (currentTempurature) => currentTempurature > 0 && currentTempurature <= 100,
            message: 'Current tempurature is out of range',
        default: 0,
    },
    timeRecord: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const Temp = Device.discriminator('Temp', TempSchema);

export default Temp;

