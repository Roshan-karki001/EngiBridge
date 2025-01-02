const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["client", "engineer"],
    required: [true, "User role is required"],
  },
  contact_info: {
    phone: {
      type: String,
      required: [true, "Contact phone is required"],
    },
    address: {
      type: String,
      required: [false],
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
