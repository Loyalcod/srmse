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
        getstudentClass.subjectId.push(studentCreate._id)
        const updateStudentClass = getstudentClass.save()

        res.json(studentCreate)
        
    } catch (error) {
        res.json({error:error.message})
    }
}