import {ObjectId, Schema} from "mongoose"
import mongoose from "mongoose"
import Device from "./Device.js"

const DoorSchema = new Schema({
    isOpened: {
        type: Number,
        values: [0,1],
        required: true,
        default: 0,
    }
});

const Door = Device.discriminator('Door', DoorSchema);

export default Door;
