const express = require("express")
const { totalCount } = require("../controllers/totalCountCrude")
const router = express.Router()


/* --------------------------------------------------------- total count router --------------------------------------------------------- */
router.get('/',totalCount)



module.exports = router