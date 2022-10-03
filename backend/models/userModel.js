const mongoose = require('mongoose');

const userScehma = mongoose.Schema({
    name : {
        type : String,
        required : [ true, 'Please add a name']
    },
    email : {
        type: String,
        required: [ true, 'Please add an email'],
        unique: true
    },
    password : {
        type: String,
        required: [ true , 'Please add a password'],
        minlength: 4
    }
},{
    timestamps : true
})

const User = mongoose.model('User', userScehma)
module.exports = User