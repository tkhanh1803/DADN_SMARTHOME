
import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"
import Device from "./Device.js"

const HumidSchema = new Schema({
    humidity: {
        type: Number,
        required: true,
        validator: (humidity) => humidity > 0 && humidity <= 100,
            message: 'Humidity is out of range',
        default: 0,
    },
    timeRecord: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const Humid = Device.discriminator('Humid', HumidSchema);

export default Humid;

