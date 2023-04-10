const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role: String
})


module.exports = mongoose.model('User', userSchema);