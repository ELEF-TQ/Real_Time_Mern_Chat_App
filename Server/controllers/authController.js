const asyncHandler = require('express-async-handler');
const USER = require('../models/userModel');
const GenerateToken = require('../config/GenerateToken');


//_________ SignIn : 
const SignIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401);
      throw new Error("Email and password are required for sign in");
    }
    const user = await USER.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: GenerateToken(user._id),
    });
});

//_________ Signup : 
const SignUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, picture } = req.body;
    if (!name || !email || !password) {
      res.status(401);
      throw new Error("All fields are required");
    }
    const userExists = await USER.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    let pictureData = "";
    if (picture) {
      try {
        const pictureDataIndex = picture.indexOf("base64,");
        if (pictureDataIndex !== -1) {
          pictureData = picture.slice(pictureDataIndex + 7);
        }
      } catch (error) {
        res.status(400);
        throw new Error("Invalid picture data");
      }
    }
    const user = await USER.create({ name, email, password, picture: pictureData });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: GenerateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Failed to create user");
    }
});
  
//_________ GuestUserCredentials : 
const GuestUserCredentials = async (req, res) => {
    try {
      const guestUser = {
        username: "guest@example.com",
        password: "guestpassword",
      };
  
      res.json(guestUser);
    } catch (error) {
      console.error("Error fetching guest user data:", error);
      res.status(500).json({ error: "Failed to get guest user data" });
    }
};
  
module.exports ={
  SignUp, 
  SignIn,
  GuestUserCredentials
}