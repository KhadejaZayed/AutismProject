const User  = require('../Models/parentModel');
const Child = require('../Models/childModel');

exports.createChildProfile = async (req, res) => {
  try {
    const parentId = req.user.id; //comes from the JWT middleware

    // Check if user already has a child
    const user = await User.findById(parentId);
    if (user.child) {
      return res.status(400).json({ message: 'Child already exists' });
    }

    const picturePath = req.files?.profilePicture?.[0]?.path || 'http://brightpath.wapilot.net/defaultPic.png';
    const videoPath = req.files?.videoIntro?.[0]?.path || null;

    const child = new Child({
      fullName: req.body.fullName,
      videoIntro: videoPath,
      address: req.body.address,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      picture: picturePath,
    });

    const savedChild = await child.save();

    //Link the child to the user by child id
    user.child = savedChild._id;
    await user.save();

    res.status(201).json({ message: 'Child Profile has been Created Successfully', child: savedChild });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getChildInfo = async (req, res) => {
  try {
    const userId = req.user.id; // comes from the JWT middleware
    const user = await User.findById(userId).populate('child');

    if (!user || !user.child) {
      return res.status(404).json({ message: 'Child Profile has been not found'});
    }

    res.status(200).json(user.child);
  } catch(err){
    res.status(500).json({message: 'Server error', error: err.message});
  }
};

exports.updateChildProfile = async (req, res) => {
  try {
    const parentId = req.user.id; //comes from the JWT middleware
    const user = await User.findById(parentId);

    if (!user || !user.child) {
      return res.status(404).json({ message: 'Child profile has been not found' });
    }

    const newChild = {
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate,
      gender: req.body.gender
    };
    
    const picturePath = req.files?.picture?.[0]?.path;
    const videoPath = req.files?.videoIntro?.[0]?.path;
    
    if (picturePath)
      newChild.picture = picturePath;
    
    if (videoPath)   
      newChild.videoIntro = videoPath;

    const updatedChild = await Child.findByIdAndUpdate(
      user.child,
      {$set: newChild},
      { new: true } //return the updated version instead of before updating one
    );

    res.status(200).json({ message: 'Child profile has been updated Successfully', child: updatedChild });
  } catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteChildProfile = async (req, res) => {
  try {
    const parentId = req.user.id; //comes from the JWT middleware
    const user = await User.findById(parentId);

    if (!user || !user.child) {
      return res.status(404).json({ message: 'Child profile has been not found' });
    }

    await Child.findByIdAndDelete(user.child); //delete the child from DB
    
    user.child = null; //delete the ref to the removed child from user model
    await user.save();

    res.status(200).json({ message: 'Child profile has been deleted Successfully' });
  } catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};