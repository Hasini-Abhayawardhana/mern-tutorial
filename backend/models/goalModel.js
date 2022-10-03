const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text : {
        type : String,
        required : [true, 'Please add a text value']
    },
    char : {
        type : String,
        required : [true, 'Plase add a char value']
    }
},{
    timestamp : true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;