const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  word: String,
  image: String,
  //sound: String
});

const arLetterSchema = new mongoose.Schema({
  letter: { type: String, required: true },
  image: { type: String, required: true },
  sound: { type: String, required: true },
  examples: [exampleSchema]
});

module.exports = mongoose.model('arLetter', arLetterSchema);
