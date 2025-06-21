
//Model comes from route which define it want arModel or enModel
exports.getAllLetters = (Model)=> async (req, res) => {
  try {
    const letters = await Model.find();
    res.json(letters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLetterById = (Model)=> async (req, res) => {
  try {
    const letter = await Model.findById(req.params.id);
    if (!letter)
        return res.status(404).json({ message: 'Letter Not Found!' });
    
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.createLetter = (Model)=> async (req, res) => {
//   const newLetter = new Model(req.body);
//   try {
//     const savedLetter = await newLetter.save();
//     res.status(201).json(savedLetter);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
