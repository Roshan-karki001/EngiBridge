const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    F_name: {
      type: String,
      required: [true, "First name is required"],
    },
    L_name: {
      type: String,
      required: [true, "last name is required"],
    },
    G_mail: {
      type: String,
      required: [true, "user G-mail is complusary"],
    },
    Phonenumber: {
      type: String,
      required: [true, "user number is required"],
    },
    password: {
      type: String,
      required: [true, "Recipe full cook information is required"],
    },
    
  });
  
  const SignUP = mongoose.model('signup', signupSchema);
  
  module.exports = SignUP;
  
  