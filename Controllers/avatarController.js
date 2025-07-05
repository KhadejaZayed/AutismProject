const {avatar, pet} = require('../Models/avatarModel');
const User = require('../Models/parentModel'); 

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
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: 'child',
      populate: { path: 'boughtAvatars' } 
    });
    
    const child = user.child;
    if(!user || !child) {
      return res.status(404).json({message: 'Child has been not found'});
    }

    res.status(200).json({
      boughtAvatars: child.boughtAvatars || []
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

    const child = user.child;
    if (!user || !child) {
      return res.status(404).json({ message: 'Child has been not found' });
    }

    res.status(200).json({
        boughtPets: child.boughtPets || []
      });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user pets', error: err.message });
  }
};

exports.buyAvatar = async (req, res) => {
  try {
    const avatarId = req.body.avatarId; //from url
    const userId = req.user.id; //from token

    const user = await User.findById(userId).populate('child');
    if (!user || !user.child)
      return res.status(404).json({ message: 'Child is Not Found' });

    const child = user.child;
    const selectedAvatar = await avatar.findById(avatarId); //selected Avatar to be buyed    
    if (!selectedAvatar)
      return res.status(404).json({ message: 'Avatar is not found' });

    if (child.boughtAvatars.includes(avatarId)) {
      return res.status(400).json({ message: 'Avatar has been already purchased' });
    }

    //check if the coins are enough
    const avatarPrice = selectedAvatar.price; 
    if (child.coins < avatarPrice) {
      return res.status(400).json({ message: 'Not enough coins to buy avatar' });
    }

    //deduct the coins and add avatar to the bought avatars
    child.coins -= avatarPrice;
    child.boughtAvatars.push(avatarId);
    await child.save();

    res.status(200).json({
      message: 'Avatar has been Purchased Successfully',
      boughtAvatars: child.boughtAvatars,
      remainingCoins: child.coins
    });

  }catch(err){
    res.status(500).json({ message: 'Failed to purchase avatar', error: err.message });
  }
};

exports.buyPet = async (req, res) => {
  try {
    const petId = req.body.petId;
    const userId = req.user.id;

    const user = await User.findById(userId).populate('child');
    if (!user || !user.child)
      return res.status(404).json({ message: 'Child is Not Found' });

    const child = user.child;
    const selectedPet = await pet.findById(petId);
    if (!selectedPet)
      return res.status(404).json({ message: 'Pet is not found' });

    if (child.boughtPets.includes(petId)) {
      return res.status(400).json({ message: 'Pet has been already purchased' });
    }

    const petPrice = selectedPet.price;
    if (child.coins < petPrice) {
      return res.status(400).json({ message: 'Not enough coins to buy pet' });
    }

    child.coins -= petPrice;
    child.boughtPets.push(petId);
    await child.save();

    res.status(200).json({
      message: 'Pet has been Purchased Successfully',
      boughtPets: child.boughtPets,
      remainingCoins: child.coins
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to purchase pet', error: err.message });
  }
};

exports.selectAvatar = async (req, res) => {
  const {avatarId} = req.body;

  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('child');
    if (!user || !user.child)
      return res.status(404).json({ message: 'Child Not Found' });

    const child = user.child;

    const selectedAvatar = await avatar.findById(avatarId);   
    if (!selectedAvatar)
      return res.status(404).json({ message: 'Avatar is not found' });
    
    if (!child.boughtAvatars.includes(avatarId)) {
      return res.status(403).json({ message: 'Avatar has been Not Purchased by this child' });
    }
    
    if(child.currentAvatar == avatarId)
      return res.status(400).json({ message: 'Avatar has been already Selected' });

    //make the current avatar has the selected avatar id 
    //update profile picture
    child.currentAvatar = avatarId;
    child.picture = selectedAvatar.avatarPicture;
    await child.save();

    res.json({
      message: 'Avatar has been Selected Successfully',
      selectedAvatar,
      currentAvatar: child.currentAvatar
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.selectPet = async (req, res) => {
  const {petId} = req.body;
  
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).populate('child');
    if (!user || !user.child)
      return res.status(404).json({ message: 'Child Not Found' });
    
    const child = user.child;
    const selectedPet = await pet.findById(petId);   
    if (!selectedPet)
      return res.status(404).json({ message: 'Pet not found' });

    if (!child.boughtPets.includes(petId)) {
      return res.status(403).json({ message: 'Pet has been Not Purchased by this child' });
    }

    if(child.currentPet == petId)
      return res.status(400).json({ message: 'Pet has been already Selected' });


    //Make the current pet has the selected pet id
    child.currentPet = petId;
    await child.save();

    res.json({
      message: 'Pet has been Selected Successfully',
      selectedPet,
      currentPet: child.currentPet
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};