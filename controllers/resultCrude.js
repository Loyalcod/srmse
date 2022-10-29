const result = require("../model/resultModel")
const student = require("../model/studentModel")
const subject = require("../model/subjectModel")

exports.createResult = async(req,res)=>{
    if(!(req.body.studentId || req.body.subjectId || req.body.classId || req.body.mark )) return res.status(400).json({error:"data not properly formated"})
    const { studentId, subjectId, classId, mark } = req.body

    try {
        const resultExist = await result.exists({studentId, subjectId, classId})
        if(resultExist) return res.status(403).json("this subject already exist")

        const registerResult = await result.create({
            studentId,
            subjectId,
            classId,
            mark
        })

        const pushinStudent = await student.findOneAndUpdate(
            {_id: studentId},
            {$push: {resultId: registerResult._id}}
        )

        const pushinSubject = await subject.findOneAndUpdate(
            {_id: subjectId},
            {$push : {resultId: registerResult._id}}
        )

        res.json(registerResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getResult = async(req,res)=>{
    try {
        const resultGet = await result.find()
        .populate('studentId').populate('subjectId')
        res.json(resultGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneResult = async(req,res)=>{
    const { resultId } = req.params 
    
    try {

        const oneResultGet = await result.findById(resultId)
        .populate('studentId').populate('subjectId')
        res.json(oneResultGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.checkResult = async(req,res)=>{
    const { regNo, email } = req.params 

    try {
        const studentExist = await student.exists({registrationNo: regNo, email})
        if(!studentExist) return res.status(401).json("student does not exist")

        const resultCheck = await student.find({registrationNo:regNo, email})
        .populate('classId').populate({
            path: 'resultId',
            populate:{
                path: 'subjectId'
            }
        })

        res.json(resultCheck)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateResult = async(req,res)=>{
    const { resultId } = req.params 

    const classId = req.body.classId !== ''? req.body.classId : result.classId;
    const mark = req.body.mark !== ''? req.body.mark : result.mark;

    try {
        const resultUpdate = await result.updateOne(
            {_id: resultId},
            {$set: {classId, mark}}
        )
        res.json(resultUpdate)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delResult = async(req,res) =>{
    const { resultId, studentId, subjectId } = req.params 

    try {
        const removeResultFromStudent = await student.findOneAndUpdate(
            {_id: studentId},
            {$pull: {resultId}}
        )
        const removeResultFromSubject = await subject.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {resultId}}
        )
        const deleteResult = await result.deleteOne({_id: resultId})
        res.json(deleteResult)
        
    } catch (error) {
        res.json({error:error.message})
    }
}