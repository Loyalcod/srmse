const express = require("express")
const { createResult, getResult, getOneResult, checkResult, updateResult, delResult } = require("../controllers/resultCrude")
const router = express.Router()
const verifyAuthentication = require("../middleWare/verifyAuthentication")


/* -------------------------------------------------------- CREATE RESULT ROUTER -------------------------------------------------------- */
router.post('/', verifyAuthentication,  createResult,)

/* ---------------------------------------------------------- GET RESULT ROUTER --------------------------------------------------------- */
router.get('/', verifyAuthentication, getResult,)

/* -------------------------------------------------------- GET ONE RESULT ROUTER ------------------------------------------------------- */
router.get('/:resultId', verifyAuthentication, getOneResult,)

/* --------------------------------------------------------- CHECK RESULT ROUTER -------------------------------------------------------- */
router.get('/specific/:regNo/:email', checkResult)

/* -------------------------------------------------------- UPDATE RESULT ROUTER -------------------------------------------------------- */
router.patch("/:resultId", verifyAuthentication, updateResult,)

/* -------------------------------------------------------- DELETE RESULT ROUTER -------------------------------------------------------- */
router.delete('/:studentId/:subjectId/:resultId', verifyAuthentication, delResult,)





module.exports = router