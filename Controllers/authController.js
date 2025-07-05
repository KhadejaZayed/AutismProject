const jwt        = require("jsonwebtoken");
const userModel  = require('../Models/parentModel');
const bcrypt     = require('bcrypt');
const saltRounds = 10;

//For Login
const checkMailAndPassword = async (model, request, response) => {
	try {
        //return array of emails which match the email 
		let data = await model.findOne({ email: request.body.email });
		if (data == null) { //if there is no email matchs  
			throw new Error('Email is not Found');
		} else {
            //compare between given pass and pass in DB
			let matched = await bcrypt.compare(request.body.password, data.password);
			if (!matched) throw new Error('Password is not correct');
		}
        //return thr email and its token
		return data;
	} catch (error) {
        // next(error); 
        throw error;
    }
};


exports.signUser = (req, res, next) => {
    //Check if the User Exists
    userModel.find({ email: req.body.email })
        .exec()
        .then((user) => {
            //if there is an email match the given
            if (user.length >= 1) {
                return res.status(409).json({ message: "Email already has been used" });
            }
            //Make password more than or equal 8 
            if (req.body.password.length < 8) {
                let passErrMsg = new Error("Password is Min of 8");
                return next(passErrMsg);
            }
            // Check if password matches confirmPassword 
            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).json({
                    message: "Password and Confirm Password do not match"
                });
            }
            //Bcrypt password and store the data
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) { //happens in bcryption
                    return res.status(500).json({ error: err });
                }
                //Create a New User:
                const user = new userModel({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                });
                user.save()
                .then((result) => {
                    //Create token
                    const token = jwt.sign(
                        { id: result._id, role: "user" },
                        process.env.JWT_SECRET,
                        { expiresIn: "7d" }
                    );
                    res.status(201).json({
                        message: "User Created and Logged In",
                        user: {
                            _id: result._id, 
                            username: result.username,
                            email: result.email,
                        },
                        token: token
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "User Failed to be Created",
                        error: err,
                    });
                });
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Something went wrong", error: err.message });
        });
};


exports.loginUser=(request,response)=>{
    //checkMailAndPassword(userModel , request, response)
    checkMailAndPassword(userModel , request)
    .then(data => {
        // If email and password are correct, generate the token
        let token = jwt.sign(
            { id: data._id, role: "user" },  // Payload
            process.env.JWT_SECRET,  // Secret key
            { expiresIn: "7d" }  //Make Token expiration is a week
        );
        
        // Send response with the token
        response.status(200).json({
            message: "Authenticated Successfully",
            user: {
                _id: data._id, 
                username: data.username,
                email: data.email,
            },
            token: token
        });
    })
    .catch(error => { 
        // Handle error if something goes wrong
        response.status(500).json({
            message:error.message
        });
    });
};

//Change Password (Ebraam)
exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'all fields are required!' });
  }

  try {
    //find user in DB
    const user = await userModel.findOne({email});
    if (!user)
        return res.status(404).json({ message: 'User not found' });

    //Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
        return res.status(401).json({ message: 'Old password incorrect' });

    //hashing new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    //update old password with new one
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err.message });
  }
};
