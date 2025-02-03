// const SignUP = require('../models/alldatabase');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// // Function to register a new user with hashed password
// const registerUser = async (req, res) => {
//   try {
//     const { F_name, L_name, G_mail, Phonenumber, password } = req.body;

//     // Check if email already exists
//     const existingUser = await SignUP.findOne({ G_mail });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new SignUP({
//       F_name,
//       L_name,
//       G_mail,
//       Phonenumber,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Function to log in a user
// const loginUser = async (req, res) => {
//   try {
//     const { G_mail, password } = req.body;

//     // Check if user exists
//     const user = await SignUP.findOne({ G_mail });
//     if (!user) {
//       console.log('User not found:', G_mail);
//       return res.status(401).json({ message: 'Incorrect email or password' });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log('Invalid password for user:', G_mail);
//       return res.status(401).json({ message: 'Incorrect email or password' });
//     }

//     // Generate token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//     console.log('Login successful for user:', G_mail);
//     res.status(200).json({ message: 'You are welcome', token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



// const getidsignup=  async (req, res) => {
//   try {
//       const user = await SignUP.findById(req.params.id);
//       if (!user) {
//           return res.status(404).json({ success: false, message: 'user not found' });
//       }
//       res.status(200).json({ success: true, user });
//   } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//   }
// };


// //  edit profile info 
// const editprofile=  async (req, res) => {
//   try {
//       const { F_name, L_name, G_mail, Phonenumber, password } = req.body;
//       const updatedUser = await SignUP.findByIdAndUpdate(
//           req.params.id,
//           { F_name, L_name, G_mail, Phonenumber, password },
//           { new: true, runValidators: true }
//       );
//       if (!updatedUser) {
//           return res.status(404).json({ success: false, message: 'user not found' });
//       }
//       res.status(200).json({ success: true, message: 'user updated', updatedUser });
//   } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//   }
// };

// const  deleteprofile= async (req, res) => {
//   try {
//       const deletedUser = await SignUP.findByIdAndDelete(req.params.id);
//       if (!deletedUser) {
//           return res.status(404).json({ success: false, message: 'user not found' });
//       }
//       res.status(200).json({ success: true, message: 'user deleted' });
//   } catch (err) {
//       res.status(500).json({ success: false, error: err.message });
//   }
// };


// module.exports = { registerUser, loginUser,getidsignup,editprofile,deleteprofile };

const SignUP = require('../models/alldatabase');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs for client or engineer
const nodemailer = require('nodemailer'); // For sending emails
const crypto = require('crypto'); // For generating reset tokens

dotenv.config();

// Function to send verification email
const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email address: ${verificationUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

// Function to register a new user (without hashing password)
const registerUser = async (req, res) => {
  try {
    const { F_name, L_name, G_mail, Phonenumber, password, role } = req.body;

    // Check if email already exists
    const existingUser = await SignUP.findOne({ G_mail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate unique client_id or engineer_id based on the role
    let client_id, engineer_id;
    if (role === 'client') {
      client_id = `client_${uuidv4()}`;
    } else if (role === 'engineer') {
      engineer_id = `engineer_${uuidv4()}`;
    }

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    
    const newUser = new SignUP({
      F_name,
      L_name,
      G_mail,
      Phonenumber,
      password, // Store plain text password (not recommended)
      role,
      client_id,
      engineer_id,
      verificationToken, // Store verification token
      isVerified: false, // User is not verified initially
    });

    // Save user with pending verification
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(G_mail, verificationToken);

    res.status(201).json({ message: 'User registered successfully, please check your email to verify your account.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to verify user email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user by verification token
    const user = await SignUP.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Update user to mark as verified
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    await user.save();

    res.status(200).json({ message: 'Email verified successfully, you can now log in.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to log in a user (without password comparison)
const loginUser = async (req, res) => {
  try {
    const { G_mail, password } = req.body;

    // Check if user exists
    const user = await SignUP.findOne({ G_mail });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first.' });
    }

    // Compare passwords (no hashing, checking plain-text)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Since we removed JWT, no token is generated here
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
const getidsignup = async (req, res) => {
  try {
    const user = await SignUP.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Edit profile info
const editprofile = async (req, res) => {
  try {
    const { F_name, L_name, G_mail, Phonenumber, password } = req.body;
    const updatedUser = await SignUP.findByIdAndUpdate(
      req.params.id,
      { F_name, L_name, G_mail, Phonenumber, password },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User updated', updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete profile
const deleteprofile = async (req, res) => {
  try {
    const deletedUser = await SignUP.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { G_mail } = req.body;
    const user = await SignUP.findOne({ G_mail });
    if (!user) {
      return res.status(404).json({ message: 'No account found with that email' });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Save the reset token and expiry to the user's profile
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send the reset token via email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      to: G_mail,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `You are receiving this email because we received a password reset request for your account. Please click the following link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error sending password reset link:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reset Password (after clicking the reset link)
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await SignUP.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpiry: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update the user's password (plain-text)
    user.password = newPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpiry = undefined; // Clear the expiry
    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getidsignup,
  editprofile,
  deleteprofile,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
