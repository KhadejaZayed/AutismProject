const NumberModel = require('../Models/numberModel');

exports.getAllNumbers = async (req, res) => {
  try {
    const numbers = await NumberModel.find();
    res.json(numbers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleNumber = async (req, res) => {
    try {
    const number = await NumberModel.findById(req.params.id);
    if (!number)
        return res.status(404).json({ message: 'Number not found' });
    res.json(number);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.createNumber = async (req, res) => {
//   try {
//     const newNumber = new NumberModel(req.body);
//     const savedNumber = await newNumber.save();
//     res.status(201).json(savedNumber);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };