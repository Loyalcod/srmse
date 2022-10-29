const express = require("express")
const { createStudent, getStudent, getOneStudent, updateStudent, delStudent } = require("../controllers/studentCrude")
const router = express.Router()



/* -------------------------------------------------------- STUDENT CREATE ROUTER ------------------------------------------------------- */
router.post('/', createStudent)

/* --------------------------------------------------------- get student router --------------------------------------------------------- */
router.get('/',getStudent)

/* ------------------------------------------------------- get one student router ------------------------------------------------------- */
router.get('/:studentId',getOneStudent)

/* -------------------------------------------------------- update student router ------------------------------------------------------- */
router.patch('/:studentId',updateStudent)

/* -------------------------------------------------------- delete student router ------------------------------------------------------- */
router.delete('/:studentId',delStudent)

module.exports = router