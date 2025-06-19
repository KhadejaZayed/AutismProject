const {avatar, pet } = require('../Models/avatarModel');
const User = require('../Models/userModel'); // Assuming the user has a `boughtAvatars` array
const Child = require('../Models/childModel');

//Get all available avatars
exports.getAllAvatars = async (req, res) => {
  try {
    const avatars = await avatar.find();
    res.status(200).json(avatars);
  }catch(err) {
    res.status(500).json({ message: "Failed to fetch avatars", error: err.message });
  }
};

//Get avatars the user has bought
exports.getUserAvatars = async (req, res) => {
  try {
    // const userId = req.user.id;
    // const user = await User.findById(userId).populate('boughtAvatars');
    
    const user = await User.findById(req.user.id).populate({
      path: 'child',
      populate: { path: 'boughtAvatars' } // assuming this is in childSchema
    });
    
    if(!user || !user.child) {
      return res.status(404).json({message: 'Child has been not found'});
    }

    res.status(200).json({
      boughtAvatars: user.child.boughtAvatars || []
    });

  }catch(err){
    res.status(500).json({ message: "Failed to fetch user avatars", error: err.message });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await pet.find();
    res.status(200).json(pets);
  } catch(err){
    res.status(500).json({ message: 'Failed to fetch pets', error: err.message });
  }
};

exports.getUserPets = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'child',
      populate: { path: 'boughtPets' }
    });

    if (!user || !user.child) {
      return res.status(404).json({ message: 'Child has been not found' });
    }

    res.status(200).json({
        boughtPets: user.child.boughtPets || []
      });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user pets', error: err.message });
  }
};

exports.buyAvatar = async (req, res) => {
  try {
    const childId = req.user.child;
    const avatarId = req.body.avatarId;

    const child = await Child.findById(childId);
    if (!child)
        return res.status(404).json({ message: 'Child has been not found' });

    if (child.boughtAvatars.includes(avatarId)) {
      return res.status(400).json({ message: 'Avatar already purchased' });
    }

    child.boughtAvatars.push(avatarId);
    await child.save();

    res.status(200).json({ message: 'Avatar has been purchased Successfully', boughtAvatars: child.boughtAvatars });
  } catch (err) {
    res.status(500).json({ message: 'Failed to purchase avatar', error: err.message });
  }
};

exports.buyPet = async (req, res) => {
  try {
    const childId = req.user.child;
    const petId = req.body.petId;

    const child = await Child.findById(childId);
    if (!child) 
        return res.status(404).json({ message: 'Child haas been not found' });

    if (child.boughtPets.includes(petId)) {
      return res.status(400).json({ message: 'Pet already purchased' });
    }

    child.boughtPets.push(petId);
    await child.save();

    res.status(200).json({ message: 'Pet purchased successfully', boughtPets: child.boughtPets });
  } catch (err) {
    res.status(500).json({ message: 'Failed to purchase pet', error: err.message });
  }
};