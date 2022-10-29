const express = require("express")
const { createSubject, getSubject, getOneSubject, updateSubject, delSubject } = require("../controllers/subjectCrude")
const router = express.Router()


/* -------------------------------------------------------- CREATE SUBJECT ROUTER ------------------------------------------------------- */
router.post('/',createSubject)

/* --------------------------------------------------------- GET SUBJECT ROUTER --------------------------------------------------------- */
router.get('/',getSubject)

/* ------------------------------------------------------- GET ONE SUBJECT ROUTER ------------------------------------------------------- */
router.get('/:subjectId',getOneSubject)

/* ------------------------------------------------------ UPDATE ONE SUBJECT ROUTER ----------------------------------------------------- */
router.patch('/:subjectId',updateSubject)

/* ------------------------------------------------------ DELETE ONE SUBJECT ROUTER ----------------------------------------------------- */
router.delete('/:subjectId',delSubject)



module.exports = router