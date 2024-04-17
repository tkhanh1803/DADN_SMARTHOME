import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import Record from '../models/Record.js'
import axios from "axios"
import Device from '../models/Device.js'
import {fanRepository,
        doorRepository,
        lightRepository,
        humidRepository,
        tempRepository,
} from '../repositories/index.js'
import {ObjectId, Schema} from "mongoose"

async function postValueToAdafruit(req, res) {
    const {feedKey, value} = req.body
    try {
        var permission = 0;
        const device = await Device.findOne({feedKey: feedKey})
        if (device.deviceType == 'Fan') {
            permission = 1;
            const deviceName = device.deviceName
            const speed = value
            const newDevice = await fanRepository.updateSpeed({deviceName, speed})
            newDevice.save()
        }
        else if (device.deviceType == 'Humid'){
            permission = 1;
            const deviceName = device.deviceName
            const humidity = value
            const newDevice = await humidRepository.updateHumid({deviceName, humidity})
            newDevice.save()
        }
        else if (device.deviceType == 'Temp'){
            permission = 1;
            const deviceName = device.deviceName
            const currentTempurature = value
            const newDevice = await tempRepository.updateTemp({deviceName, currentTempurature})
            newDevice.save()
        }
        else if (device.deviceType == 'Led'){
            permission = 1;
            const deviceName = device.deviceName
            const color = value
            const newDevice = await lightRepository.updateColor({deviceName, color})
            newDevice.save()
        }
        if (permission == 1){
            const response = await axios({
                method: 'POST',
                url: `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data`,
                headers: {
                    'X-AIO-Key': process.env.AIO_KEY,
                    'Content-Type': 'application/json',
                },
                data: { value: value },
            });

            if(response.status === 200){ 
                res.json({
                    success: true,
                    message: 'Data sent to Adafruit IO',
                });
            } else {
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: 'Error sending data to Adafruit IO',
                });
            }
        } else throw new Exception ('Invalid value input')
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false, 
            message: exception.message
        });
    }
}

async function postToggleToAdafruit(req, res) {
    const {feedKey} = req.body
    const d = await Device.findOne({feedKey: feedKey})
    const last_value = d.isOpened
    debugger
    try {
        const response = await axios({
            method: 'POST',
            url: `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data`,
            headers: {
                'X-AIO-Key': process.env.AIO_KEY,
                'Content-Type': 'application/json',
            },
            data: { value: 1 - last_value },
        });

        if(response.status === 200){ 
            const device = await Device.findOne({feedKey: feedKey})
            if (device.deviceType == 'Door') {
                const deviceName = device.deviceName
                const newDevice = await doorRepository.toggleDoorStatus(deviceName)
                newDevice.save()
            }
            else if (device.deviceType == 'Led') {
                const deviceName = device.deviceName
                const newDevice = await lightRepository.toggleLightStatus(deviceName)
                newDevice.save()
            }
            res.json({
                success: true,
                message: 'Data sent to Adafruit IO',
            });
        } else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error sending data to Adafruit IO',
            });
        }
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false, 
            message: exception.message
        });
    }
}

async function getFromAdafruit(req, res) {
    const {feedKey} = req.body
    try {
        const response = await axios.get(`https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data/last`,
            {headers: {
                'X-AIO-Key': process.env.AIO_KEY,
            }}
        )
        const dt = response.data;
        const value = dt?.value;
        const timestamp = dt?.created_at;
        res.status(HttpStatusCode.OK).json({
            message: `Get device with feed key '${feedKey}' successfully`,
            feed: feedKey,
            value: value,
            timestamp: timestamp,
        })
    } catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function getDeviceHistoryByFeedKey (req, res) {
    const { feedKey } = req.body;
    const url =  `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedKey}/data`;
    const headers = {
        'X-AIO-Key': process.env.AIO_KEY,
    }
    try {
        const response = await axios.get(url, {headers});
        const data = response.data;
        res.json({
            feed: feedKey,
            data: data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving data from Adafruit IO',
        });
    }
}
    
export default {
    postValueToAdafruit,
    getFromAdafruit,
    getDeviceHistoryByFeedKey,
    postToggleToAdafruit,
}