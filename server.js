const express = require("express")
const server = express()
const cors = require("cors")
const corsOption = require("./config/corsOption")
const credential = require("./middleWare/credentials")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
const connectDB = require("./config/db")
require("dotenv").config({path: path.resolve(__dirname, './.env')})

connectDB()
server.use(credential)
server.use(cors(corsOption))

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

/* --------------------------------------------------------- RESULT ROUTER CRUDE -------------------------------------------------------- */
const resultRouter = require("./routers/resultRouter")
server.use("/result",resultRouter)

const verifyAuthentication = require("./middleWare/verifyAuthentication")
server.use(verifyAuthentication)

/* ----------------------------------------------------- STUDENT CLASS ROUTER CRUDE ----------------------------------------------------- */
const studentClassRouter = require("./routers/stdClassRouter")
server.use('/class', studentClassRouter)

/* -------------------------------------------------------- STUDENT ROUTER CRUDE -------------------------------------------------------- */
const studentRouter = require("./routers/studentRouter")
server.use("/student",studentRouter)

/* -------------------------------------------------------- SUBJECT ROUTER CRUDE -------------------------------------------------------- */
const subjectRouter = require("./routers/subjectCrude")
server.use("/subject",subjectRouter)

/* ---------------------------------------------- STUDENT SUBJECT COMBINATION ROUTER CRUDE ---------------------------------------------- */
const stdSbjComboRouter = require("./routers/stdSbjComboRouter")
server.use("/combo",stdSbjComboRouter)

const totalCountRouter = require("./routers/totalCountRouter")
server.use("/count",totalCountRouter)


server.listen(port,()=>{
    console.log("this server is running")
})