const SignUP = require('../models/signupmodel');
const bcrypt = require('bcrypt');

// Function to register a new user with hashed password
const registerUser = async (req, res) => {
  try {
    const { F_name, L_name, G_mail, Phonenumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new SignUP({
      F_name,
      L_name,
      G_mail,
      Phonenumber,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { G_mail, password } = req.body;

    const user = await SignUP.findOne({ G_mail });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).send('You are welcome');
    } else {
      res.status(401).send('Incorrect Gmail or password');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

module.exports ={loginUser,registerUser};
