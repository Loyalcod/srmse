const student = require("../model/studentModel")
const studentClass = require("../model/studentClassModel")
const subject = require("../model/subjectModel")
const result = require("../model/resultModel")


exports.totalCount = async(req,res)=>{

    try {
        const studentCount = await student.count()
        const studentClassCount = await studentClass.count()
        const subjectCount = await subject.count()
        const resultCount = await result.count()

        res.json({
            studentCount,
            studentClassCount,
            subjectCount,
            resultCount
        })
        
    } catch (error) {
        res.json({error:error.message})
    }
}