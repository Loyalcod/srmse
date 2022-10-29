const express = require("express")
const { registerCombo, getCombo, getOneCombo, toggolecomboStatus, deleteCombo } = require("../controllers/stdSbjComboCrude")
const router = express.Router()


/* ---------------------------------------------- CREATE STUDENT SUBJECT COMBINATION ROUTER --------------------------------------------- */
router.post('/',registerCombo)

/* ----------------------------------------------- GET STUDENT SUBJECT COMBINATION ROUTER ----------------------------------------------- */
router.get('/',getCombo)

/* --------------------------------------------- GET ONE STUDENT SUBJECT COMBINATION ROUTER --------------------------------------------- */
router.get('/:comboId',getOneCombo)

/* ------------------------------------------ TOGGOLE STUDENT SUBJECT COMBINATION STATUS ROUTER ----------------------------------------- */
router.get('/status/:comboId',toggolecomboStatus) 

/* ---------------------------------------------- DELETE STUDENT SUBJECT COMBINATION ROUTER --------------------------------------------- */
router.delete('/:studentId/:subjectId/:comboId',deleteCombo)


module.exports = router