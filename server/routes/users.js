const express = require('express');
const { response } = require('../app');
const User = require('../models/user');
const router = express.Router();

/* GET users listing. */
router.get("/register", async(req, res) => {
  const users = await User.find().exec(); 
  res.status(200).json({users});
});

router.post("/register", async (req, res) => {
  const { newUsername, newPassword } = req.body;

  // If any field is empty, let user know
  if (!newUsername || !newPassword) {
    res.status(404).json({message: "empty"});
    //create modal box to warn about empty
    console.log("Cannot have empty fields");
  } 
  else if (await User.findOne({username: newUsername})){
    res.status(401).json({message: "exist"});
    //handle existing user credentials by creating modal box saying username taken
    
    console.log("username already exist!")
  } else {
    const newUser = await User.create({
      username:newUsername,
      password:newPassword,
    });
    newUser.save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.json(error);
    });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user with the given ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
