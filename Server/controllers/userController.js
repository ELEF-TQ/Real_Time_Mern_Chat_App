const asyncHandler = require('express-async-handler');
const USER = require('../models/userModel');

//_________ getAllUsers : 
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('User object not found in request.');
    }

    const keyword = req.query.search ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ]
    } : {};

    const users = await USER.find({ ...keyword ,_id: { $ne: req.user._id }});
    res.send(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);

  }
});

module.exports = { 
  getAllUsers 
};
