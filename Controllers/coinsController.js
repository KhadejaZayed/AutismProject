const User = require("../Models/childModel");
const Child = require('../Models/childModel');

// Get current coin balance
exports.getCoins = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('child');
    if (!user || !user.child)
        return res.status(404).json({ message: 'Child has been not found' });

    return res.status(200).json({ coins: user.child.coins });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch coins', error: err.message });
  }
};

//Add coins
exports.addCoins = async (req, res) => {
  const { addedAmount } = req.body;
  try {
    const user = await User.findById(req.user.id).populate('child');
    if (!user || !user.child)
        return res.status(404).json({ message: 'Child has been not found' });

    user.child.coins += addedAmount;
    await user.child.save();

    return res.status(200).json({ message: `Added ${addedAmount}coins Successfuly,`, coins: user.child.coins });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to add coins', error: err.message });
  }
};

//Deduct coins
exports.deductCoins = async (req, res) => {
  const { deductedAmount } = req.body;
  try {
    const user = await User.findById(req.user.id).populate('child');
    if (!user || !user.child)
        return res.status(404).json({ message: 'Child has been not found' });

    if (user.child.coins < deductedAmount) {
      return res.status(400).json({ message: 'Not enough coins!' });
    }

    user.child.coins -= deductedAmount;
    await user.child.save();

    return res.status(200).json({ message: `Deducted ${deductedAmount}coins Successfully`, coins: user.child.coins });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to deduct coins', error: err.message });
  }
};

//Level up
exports.levelUp = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('child');
    if (!user || !user.child)
        return res.status(404).json({ message: 'Child has been not found' });

    user.child.level += 1;

    // Optional: reward coins for leveling up
    //const reward = 10; 
    //user.child.coins += reward;

    await user.child.save();

    return res.status(200).json({message: 'Level up Successfully', level: user.child.level});
  } catch (err) {
    return res.status(500).json({ message: 'Failed to level up', error: err.message });
  }
};

//reset Coins
// exports.resetCoins = async (req, res) => {
//     try {
//         let user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         await user.resetCoins();
//         res.status(200).json({ message: "Coins reset to 0", coins: user.coins });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };