const studentClass = require("../model/studentClassModel")


exports.createStudentClass = async(req,res)=>{
    if(!(req.body.className || req.body.grade)) return res.status(400).json({error: "data is not properly formatted"})
    const { className, grade } = req.body

    try {
        const classExist = await studentClass.exists({className})
        if(classExist) return res.status(401).json("this class already exist")

        const classCreate = await studentClass.create({
            className,
            grade
        })

        res.json(classCreate)
        
    } catch (error) {
        res.json({error: error.message})
    }
}

exports.getClass = async(req,res)=>{

    try {
        
        const classGet = await studentClass.find()
        res.json(classGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneClass = async(req,res)=>{
    const { classId } = req.params 

    try {
        
        const classGetOne = await studentClass.findById(classId)
        res.json(classGetOne)

    } catch (error) {
        
    }
}

exports.updateClass = async(req,res)=>{
    if(!(req.body.className || req.body.grade)) return res.status(400).json({error: "data is not properly formatted"})

    const { classId } = req.params 

    const className = req.body.className === ''? studentClass.className : req.body.className
    const grade = req.body.grade === "" ? studentClass.grade : req.body.grade

    try {
        const updateClass = await studentClass.updateOne(
            {_id: classId},
            {$set: {className, grade}}
        )

        res.json(updateClass)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteClass = async(req,res)=>{
    const { classId } = req.params 

    try {
        const classDel = await studentClass.deleteOne({_id: classId})
        res.json(classDel)
        
    } catch (error) {
        res.json({error:error.message})
    }
}