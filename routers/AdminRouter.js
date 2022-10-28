const express = require("express")
const { registerAdmin } = require("../controllers/AdminCrude")
const router = express.Router()


/* ----------------------------------------------------- this is create admin router ---------------------------------------------------- */
router.post("/",registerAdmin)






module.exports = router