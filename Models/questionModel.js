const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content:{
        type : String,
        required:true
    },
    questionPicture:{
        type : String,
        required:true
    },
    choices:{
        type: [String],
        validate: {
        validator: function (val) {
             return val.length === 4;
        },
        message: 'There must be exactly 4 choices.',
        },
        required: true,
    },
    correctChoice: {
        type: String,
        validate: {
        validator: function (val){
            return this.choices.includes(val);
            },
            message: 'Right choice must be one of the choices.',
        },
        required: true
    }
});

module.exports = mongoose.model("questionModel", questionSchema);