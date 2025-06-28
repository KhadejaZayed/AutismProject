const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
    avatarName:{
        type:String, 
        required: true
    },
    avatarPicture: String,
    price:Number
});

const petSchema = new mongoose.Schema({
    petName:{
        type:String, 
        required: true
    },
    petPicture: String,
    price:Number
});

const avatar = mongoose.model('Avatar', avatarSchema); 
const pet    = mongoose.model('Pet',    petSchema); 

module.exports = {
    avatar,
    pet
};
