const mongoose = require('mongoose');
const Schema = mongoose.Schema; // accessing mongoose Schema class

const studentSchema = new  Schema({
    firstname : {
        type: String,
        required: true,
    },
    surname : {
        type: String,
        required: true,
    },
    dob:{
        type: String,
        required: true,
    },
    dateOfEnrollment : {
        type: String,
        required: true,
    },
    parentName: {
        type: String,
        required: true,
    },
    programme:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Student', studentSchema);