require('dotenv').config()

const express = require('express')

const cors = require('cors')
const router = require('./router/routes')
require('./database/dbConnection')

const snServer = express()

snServer.use(cors())
snServer.use(express.json())
snServer.use(router)

const PORT = 3000 || process.env.PORT

snServer.listen(PORT,()=>{
    console.log(`sn server started at port ${PORT}`);
    
})

snServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>sn server started running at PORt ${PORT}</h1>`)
})