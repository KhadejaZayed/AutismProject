const User = require('../Models/parentModel');

exports.getParentProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const user = await User.findById(userId).populate('child');
    const child = user.child;

    if (!user)
        return res.status(404).json({ message: 'Parent has been not found' });

    res.status(200).json({
      username: user.username,
      email: user.email,
      picture: user.picture, // assume you add this field
      child: child || ""
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;       // from token (auth middleware)
    const imagePath = req.file?.path; //if does not exist, returb undefined

    if (!imagePath) {
      return res.status(400).json({ message: 'No image has been uploaded' });
    }

    const user = await User.findById(userId);
    if (!user)
        return res.status(404).json({ message: 'User has been not found' });

    user.picture = imagePath;
    await user.save();

    res.status(200).json({ message: 'Profile picture has been uploaded', picture : user.picture});
    // res.status(200).json({ message: 'Profile picture has been uploaded', picture : imagePath});
  }catch(err){
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
};
