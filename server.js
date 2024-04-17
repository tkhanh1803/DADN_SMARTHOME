import express from 'express'
import * as dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
import connect from './database/database.js'

import {
    doorsRouter,
    fansRouter,
    lightsRouter,
    recordsRouter,
    tempsRouter,
    humidsRouter,
    adafruitsRouter,
} from './routes/index.js'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 3000

app.use('/doors', doorsRouter)  
app.use('/fans', fansRouter)  
app.use('/lights', lightsRouter)
app.use('/records', recordsRouter)
app.use('/temps', tempsRouter)
app.use('/humids', humidsRouter)
app.use('/adafruits', adafruitsRouter)

app.get('/', (req, res) => {
    res.send('response from root router')
})

app.listen(port, async() => {
    await connect()
    console.log(`listening on port ${port}`)
})

