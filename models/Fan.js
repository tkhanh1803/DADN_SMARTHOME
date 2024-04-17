import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"
import Device from "./Device.js"

const FanSchema = new Schema({
    speed: {
        type: Number,
        validator: function(value) {
            if ((value <= 0 || value > 100)) {
                return false;
            }
            return true;
        },
        message: props => `${props.value} Speed value is out of range`,
        default: 0,
    }
});

const Fan = Device.discriminator('Fan', FanSchema);

export default Fan;
