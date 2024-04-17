import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"
import Device from "./Device.js"

const LightSchema = new Schema({
    color: {
        type: String,
        required: true,
        validator: (color) => color = /^#[0-9a-f]{6}$/,
            message: 'Color is not supported',
        default: "#000000",
    }
});

const Light = Device.discriminator('Light', LightSchema);

export default Light;
