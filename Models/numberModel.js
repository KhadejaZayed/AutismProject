const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  number: { type: String, required: true },
  image: String,
  sound: String,
  word: String,
  wordImage: String
});

module.exports = mongoose.model('Number', numberSchema);