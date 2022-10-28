const express = require("express")
const server = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
const connectDB = require("./config/db")
require("dotenv").config({path: path.resolve(__dirname, './.env')})

connectDB()

const port = process.env.PORT
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(cookieParser())


server.get("/",(req,res)=>{
    res.send("this is the server side")
})

/* --------------------------------------------------------- ADMIN ROUTER CRUDE --------------------------------------------------------- */
const AdminRouter = require('./routers/AdminRouter')
server.use('/admin',AdminRouter)



server.listen(port,()=>{
    console.log("this server is running")
})