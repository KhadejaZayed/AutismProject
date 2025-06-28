const User = require("../Models/userModel");

// Get current child coins
exports.getCoins = async (req, res) => {
  try {
    const userId = req.user.id; //from token
    const user = await User.findById(userId).populate('child');
    if (!user || !user.child)
        return res.status(404).json({ message: 'Child has been not found' });

    const child = user.child;
    return res.status(200).json({ coins: child.coins });
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

    const child = user.child;
    child.coins += addedAmount;
    await child.save();

    return res.status(200).json({ message: `Added ${addedAmount}coins Successfuly,`, coins: child.coins });
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

    const child = user.child;
    if (child.coins < deductedAmount) {
      return res.status(400).json({ message: 'Not enough coins!' });
    }

    child.coins -= deductedAmount;
    await child.save();

    return res.status(200).json({ message: `Deducted ${deductedAmount}coins Successfully`, coins: child.coins });
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

    const child = user.child;
    child.level += 1;

    // Optional: reward coins for leveling up
    //const reward = 10; 
    //child.coins += reward;
x
    await child.save();

    return res.status(200).json({message: 'Level up Successfully', level: child.level});
  } catch (err) {
    return res.status(500).json({ message: 'Failed to level up', error: err.message });
  }
};

//reset Coins
// exports.resetCoins = async (req, res) => {
//     try {
//         let user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         
//         const child = user.child;
//         child.coins =0;
//         await child.save();
//
//         res.status(200).json({ message: "Coins reset to 0", coins: child.coins });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
