const Letter = require('../Models/arLetterModel');

exports.getAllLetters = async (req, res) => {
  try {
    const letters = await Letter.find();
    res.json(letters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getLetterById = async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.id);
    if (!letter)
        return res.status(404).json({ message: 'Letter Not Found!' });
    
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.createLetter = async (req, res) => {
//   const newLetter = new Letter(req.body);
//   try {
//     const savedLetter = await newLetter.save();
//     res.status(201).json(savedLetter);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
