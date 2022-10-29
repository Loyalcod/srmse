const combo = require("../model/stdSbjComboModel")
const student = require("../model/studentModel")
const subject = require('../model/subjectModel')

exports.registerCombo = async(req,res)=>{
    
    const { studentId, subjectId } = req.body

    try {
        const comboExist = await student.findById(studentId)
        if(comboExist.subjectId.includes(subjectId)){
            return res.status(403).json("student subject combination exist")
        }

        const createCombo = await combo.create({
            studentId,
            subjectId
        })

        const pushSubjectinStudent = await student.findOneAndUpdate(
            {_id: studentId},
            {$push: {subjectId}}
        )

        const pushStudentinSubject = await subject.findOneAndUpdate(
            {_id: subjectId},
            {$push: {studentId}}
        )

        res.json(createCombo)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getCombo = async(req,res)=>{

    try {
        const comboGet = await combo.find()
        .populate('studentId').populate("subjectId")
        res.json(comboGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneCombo = async(req,res)=>{
    const { comboId } = req.params 

    try {

        const oneComboGet = await combo.findById(comboId)
        .populate('studentId').populate("subjectId")
        res.json(oneComboGet)
        
    } catch (error) {
        res.json({error:error.message})
    }
}



exports.toggolecomboStatus = async(req,res) => {
    const { comboId } = req.params

    try {
        const SelectStatus = await combo.findById(comboId).select('status')
        let realStatus = SelectStatus.status

        realStatus === true ? realStatus = false : realStatus = true

        const updateStatus = await combo.updateOne(
            {_id: comboId},
            {$set: {status: realStatus}}
        )

        res.json(updateStatus)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteCombo = async(req,res)=>{
    const { studentId, subjectId, comboId } = req.params 

    try {
        const removeSubjectinStudent = await student.findOneAndUpdate(
            {_id: studentId},
            {$pull: {subjectId}}
        )

        const removeStudentinSubject = await subject.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {studentId}}
        )

        const delCombo = await combo.deleteOne({_id: comboId})
        res.json(delCombo)

    } catch (error) {
        res.json({error:error.message})
    }
}
