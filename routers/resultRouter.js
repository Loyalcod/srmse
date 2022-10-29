const express = require("express")
const { createResult, getResult, getOneResult, checkResult, updateResult, delResult } = require("../controllers/resultCrude")
const router = express.Router()

/* -------------------------------------------------------- CREATE RESULT ROUTER -------------------------------------------------------- */
router.post('/', createResult)

/* ---------------------------------------------------------- GET RESULT ROUTER --------------------------------------------------------- */
router.get('/',getResult)

/* -------------------------------------------------------- GET ONE RESULT ROUTER ------------------------------------------------------- */
router.get('/:resultId',getOneResult)

/* --------------------------------------------------------- CHECK RESULT ROUTER -------------------------------------------------------- */
router.get('/specific/:regNo/:email', checkResult)

/* -------------------------------------------------------- UPDATE RESULT ROUTER -------------------------------------------------------- */
router.patch("/:resultId",updateResult)

/* -------------------------------------------------------- DELETE RESULT ROUTER -------------------------------------------------------- */
router.delete('/:studentId/:subjectId/:resultId',delResult)





module.exports = router