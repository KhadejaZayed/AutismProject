const mongoose      = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const parentSchema = new mongoose.Schema({
    _id: Number,
    username:{
        type:String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email must be unique"],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        'Please fill a valid email address'
        ]
    },
    password: { 
        type: String,
        required: true,
        length: {min: 8}
    },
    picture:{
        type:String,
        // default: "http://brightpath.wapilot.net/defaultPic.png"
        default:"http://localhost:3000/defaultPic.png"
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    }
});

parentSchema.plugin(AutoIncrement,{
    id: 'userCounter',
    inc_field: "_id"
});

const userModel = mongoose.model("parentModel", parentSchema); //new name for model

module.exports = userModel;