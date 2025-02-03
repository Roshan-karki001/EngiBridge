const express = require('express');
const authenticate = require('../midware/authMiddleware'); // Authentication middleware
const { registerUser, loginUser,getidsignup,editprofile,deleteprofile } = require('../controller/authcontroller');

const authrouter = express.Router();

// Register user without authentication middleware
authrouter.post('/register', registerUser);
// Login user
authrouter.post('/login', loginUser);
// Profile route (protected)
authrouter.get('/profile', authenticate, (req, res) => {
  res.status(200).json({ message: 'User profile data', user: req.user });
});


signinrouter.get("/:id", getidsignup);
signinrouter.put("/:id", editprofile);
signinrouter.delete("/:id", deleteprofile);



module.exports = authrouter;

