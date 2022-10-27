const express = require("express")
const server = express()
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()



const port = process.env.PORT
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())



server.get("/",(req,res)=>{
    res.send("this is the server side")
})



server.listen(port,()=>{
    console.log("this server is running")
})