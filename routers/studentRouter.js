const express = require("express")
const { createStudent } = require("../controllers/studentCrude")
const router = express.Router()



/* -------------------------------------------------------- STUDENT CREATE ROUTER ------------------------------------------------------- */
router.post('/', createStudent)





module.exports = router