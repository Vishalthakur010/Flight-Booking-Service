const express=require('express')

const {serverConfig, Logger, Queue}=require('./config')
const apiRoutes=require('./routes')
const CRON = require('./utils/common/cron-jobs')

const app=express()

app.use(express.json());             // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT, async ()=>{
    // Logger.info("Successfully started the server", {})
    console.log(`Successfully started the server at port : ${serverConfig.PORT}`)
    CRON()
    await Queue.connectQueue()
    console.log('queue connected')
})