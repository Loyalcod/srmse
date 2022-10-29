const student = require("../model/studentModel")
const studentClass = require("../model/studentClassModel")



exports.createStudent = async(req,res)=>{
    if(!(req.body.name || req.body.regNo || req.body.email || req.body.gender || req.body.dob || req.body.classId )) return res.status(400).json({error:"data is not properly formatted"})
    const { name, regNo, email, gender, dob, classId } = req.body

    try {
        const regNoExist = await student.exists({registrationNo:regNo})
        if(regNoExist) return res.status(401).json("reg No already exist ")
        const emailExist = await student.exists({email})
        if(emailExist) return res.status(401).json("email already exist")
        const studentCreate = await student.create({
            name,
            registrationNo: regNo,
            email,
            gender,
            dob,
            classId
        })

        const getstudentClass = await studentClass.findById(classId)
        getstudentClass.studentId.push(studentCreate._id)
        const updateStudentClass = getstudentClass.save()

        res.json(studentCreate)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getStudent = async(req,res)=>{
    try {
        const studentget = await student.find().populate('classId')
        res.json(studentget)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneStudent = async(req,res)=>{
    const { studentId } = req.params 

    try {
        const oneStudentGet = await student.findById(studentId).populate('classId')
        res.json(oneStudentGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateStudent = async(req,res)=>{
    const { studentId } = req.params 
    const { name, regNo, email, gender, dob, classId } = req.body
    
    try {
        const getfromExistingStudent = await student.findOne({_id: studentId })
        if(getfromExistingStudent.classId !== classId){

            const removeStudentInClass = await studentClass.findOneAndUpdate(
                {studentId},
                {$pull: {studentId}}
            )

            const pushStudentInClass = await studentClass.findOneAndUpdate(
                {_id: classId},
                {$push: {studentId}}

            )
        }

        const studentUpdate = await student.updateOne(
            {_id: studentId},
            {$set: {
                name,
                registrationNo: regNo,
                email,
                gender,
                dob,
                classId
            }}
        )

        res.json(studentUpdate)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delStudent = async(req,res)=>{
    const { studentId,} = req.params 

    try {
        
        const pullStudentFromClass = await studentClass.findOneAndUpdate(
            {studentId},
            {$pull: {studentId}}
        )

        const studentDel = await student.deleteOne({_id: studentId})
        res.json(studentDel)
        
    } catch (error) {
        res.json({error:error.message})
    }
}