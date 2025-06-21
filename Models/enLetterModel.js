const mongoose = require('mongoose');

const enLetterSchema = new mongoose.Schema({
  letter: { type: String, required: true },
  image: { type: String, required: true },
  sound: { type: String, required: true }
});

module.exports = mongoose.model('enLetter', enLetterSchema);