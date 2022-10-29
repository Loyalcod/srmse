const subject = require("../model/subjectModel")

exports.createSubject = async(req,res)=>{
    if(!(req.body.subjectName || req.body.subjectCode)) return res.status(400).json({error: "data is not properly formatted"})
    const { subjectName, subjectCode } = req.body

    try {
        const subjectExist = await subject.exists({$or: [{subjectName},{subjectCode}]})
        if(subjectExist) return res.status(401).json("this subject already exist")

        const newSubject = new subject ({
            subjectName,
            subjectCode
        })

        const saveSubject = newSubject.save()
        res.json(newSubject)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getSubject = async(req,res)=>{
    try {
        
        const subjectGet = await subject.find()
        res.json(subjectGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneSubject = async(req,res)=>{
    const { subjectId } = req.params 

    try {

        const oneSubjectGet = await subject.findById(subjectId)
        res.json(oneSubjectGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateSubject = async(req,res)=>{
    const { subjectId } = req.params 

    const subjectName = req.body.subjectName !== ''? req.body.subjectName : subject.subjectName 
    const subjectCode = req.body.subjectCode !== ''? req.body.subjectCode : subject.subjectCode

    try {

        const subjectUpdate = await subject.updateOne(
            {_id: subjectId},
            {$set: {subjectName, subjectCode}}
        )

        res.json(subjectUpdate)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delSubject = async(req,res)=>{
    const { subjectId } = req.params 

    try {
        const subjectDel = await subject.deleteOne({_id: subjectId})
        res.json(subjectDel)
        
    } catch (error) {
        res.json({error:error.message})
    }
}
