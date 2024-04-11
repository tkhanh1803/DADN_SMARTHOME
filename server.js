import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import connect from './database/database.js'

import {
    doorsRouter,
    fansRouter,
    lightsRouter
} from './routes/index.js'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 3000

app.use('/doors', doorsRouter)  
app.use('/fans', fansRouter)  
app.use('/lights', lightsRouter)

app.get('/', (req, res) => {
    res.send('response from root router')
})

app.listen(port, async() => {
    await connect()
    console.log(`listening on port ${port}`)
})

