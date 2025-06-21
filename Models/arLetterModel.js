const mongoose = require('mongoose');

const arLetterSchema = new mongoose.Schema({
  letter: { type: String, required: true },
  image: { type: String, required: true },
  sound: { type: String, required: true }
});

module.exports = mongoose.model('arLetter', arLetterSchema);