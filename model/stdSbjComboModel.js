const mongoose = require("mongoose")

const comboSchema = mongoose.Schema({
    studentId: {type:mongoose.Types.ObjectId, ref:'student'},
    subjectId: {type: mongoose.Types.ObjectId, ref: 'subject'},

    status: {
        type: Boolean,
        default: true,
    }
},{timestamps: true})

module.exports = mongoose.model('combo',comboSchema)