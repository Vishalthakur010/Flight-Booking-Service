const express=require('express')

const {serverConfig, Logger}=require('./config')
const app=express()

app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server at port : ${serverConfig.PORT}`)
    // Logger.info("Successfully started the server", {})
})