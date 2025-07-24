const express=require('express')

const {serverConfig, Logger}=require('./config')
const apiRoutes=require('./routes')

const app=express()

app.use(express.json());             // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server at port : ${serverConfig.PORT}`)
    // Logger.info("Successfully started the server", {})
})