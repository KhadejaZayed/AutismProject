const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    avatarName:{
        type:String, 
        required: true
    },
    avatarPicture: String,
    //"http://localhost:3000/uploads/appleq.png"
    price:Number,
    isBuyed: Boolean
});

const petSchema = new mongoose.Schema({
    petName:{
        type:String, 
        required: true
    },
    petPicture: String,
    //"http://localhost:3000/uploads/appleq.png"
    price:Number,
    isBuyed: Boolean
});

const avatar = mongoose.model('Avatar', avatarSchema); 
const pet    = mongoose.model('Pet', petSchema); 

module.exports = {
    avatar,
    pet
};
