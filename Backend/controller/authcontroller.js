const SignUP = require('../models/alldatabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Function to register a new user with hashed password
const registerUser = async (req, res) => {
  try {
    const { F_name, L_name, G_mail, Phonenumber, password } = req.body;

    // Check if email already exists
    const existingUser = await SignUP.findOne({ G_mail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new SignUP({
      F_name,
      L_name,
      G_mail,
      Phonenumber,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { G_mail, password } = req.body;

    // Check if user exists
    const user = await SignUP.findOne({ G_mail });
    if (!user) {
      console.log('User not found:', G_mail);
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', G_mail);
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    console.log('Login successful for user:', G_mail);
    res.status(200).json({ message: 'You are welcome', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getidsignup=  async (req, res) => {
  try {
      const user = await SignUP.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ success: false, message: 'user not found' });
      }
      res.status(200).json({ success: true, user });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
};


//  edit profile info 
const editprofile=  async (req, res) => {
  try {
      const { F_name, L_name, G_mail, Phonenumber, password } = req.body;
      const updatedUser = await SignUP.findByIdAndUpdate(
          req.params.id,
          { F_name, L_name, G_mail, Phonenumber, password },
          { new: true, runValidators: true }
      );
      if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'user not found' });
      }
      res.status(200).json({ success: true, message: 'user updated', updatedUser });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
};

const  deleteprofile= async (req, res) => {
  try {
      const deletedUser = await SignUP.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
          return res.status(404).json({ success: false, message: 'user not found' });
      }
      res.status(200).json({ success: true, message: 'user deleted' });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = { registerUser, loginUser,getidsignup,editprofile,deleteprofile };
