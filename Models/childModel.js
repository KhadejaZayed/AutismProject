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
    //"http://localhost:3000/uploads/quranVideo.mp4"
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
        default: "https://cdn-icons-png.flaticon.com/512/847/847969.png" //if no picture
        //'http://localhost:3000/uploads/palestineFlag.jpeg' //for testing
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