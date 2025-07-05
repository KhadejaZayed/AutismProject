const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    fullName:{
        type:String,
        validate: {
            validator: function (value) {
              // At least two words, letters only
              return /^[a-zA-Z]+ [a-zA-Z]+$/.test(value);
            },
            message: 'Full name must include first and last name (letters only)'
        },
        required: [true, "Full name is required"],
    },
    videoIntro: String,
    address: String,
    birthDate: {
        type: Date,
        required: true,
    },
    gender:{
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is required']
    },
    picture: {
        type: String,
        default: "http://brightpath.wapilot.net/defaultPic.png" //if no picture
        //default: "http://localhost:3000/defaultPic.png" //if no picture
    },
    level: {
        type: Number, 
        default: 1 
    },
    coins: { 
        type: Number, 
        default: 0, // to start from
        min: 0 // so cannot be negative
    },
    boughtAvatars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar'
    }],
    currentAvatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avatar'
    },
    boughtPets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    currentPet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }
});

module.exports = mongoose.model('Child', childSchema);