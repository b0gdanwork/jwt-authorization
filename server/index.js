//server dependence
const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//variables
require('dotenv').config()
const PORT = process.env.PORT || 3000
const MONGO_CONNET = process.env.MONGO_CONNET || 3000


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())


const start = async () => {
    try {
        console.log("Подключаемся к БД....")
        await mongoose.connect(MONGO_CONNET)
        console.log("Подключились к БД")
        app.listen(PORT, () => {
            console.log(`Сервер создан на порту ${PORT}`)
        })
    } catch (e) {
        console.log('Сервер не смог запуститься', e)
    }
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

start()
