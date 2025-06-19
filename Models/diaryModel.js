const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const diarySchema = new mongoose.Schema({
    //_id: Number,
    _id: false,
    parent: {
        //type: mongoose.Schema.Types.ObjectId,
        type: Number,
        ref: 'User', // Reference to the parent (User)
        required: true,
      },
    day:{
        type: Number, 
        default: 1, // to start from
        min: 0 // so cannot be negative
    },
    date: {
        type: Date,
        default: Date.now
    },
    content :{
        type: String,
        required: true
    }
});

//diarySchema.plugin(AutoIncrement, { inc_field: 'diaryId' });
diarySchema.plugin(AutoIncrement);

module.exports = mongoose.model("diaryModel", diarySchema);