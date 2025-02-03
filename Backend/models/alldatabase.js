const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // To generate unique ids for client, engineer, and project

// Signup Schema
const signupSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["client", "engineer"],
    required: [true, "User role is required"],
  },
  F_name: {
    type: String,
    required: [true, 'First name is required'],
  },
  L_name: {
    type: String,
    required: [true, 'Last name is required'],
  },
  G_mail: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
  },
  Phonenumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  address: {
    type: String,
  },
  client_id: {
    type: String,
    unique: true,
  },
  engineer_id: {
    type: String,
    unique: true,
  },
});

// Pre-save hook to generate client or engineer ID based on the role
signupSchema.pre('save', function (next) {
  if (this.role === 'client') {
    // Generate unique client_id
    this.client_id = `client_${uuidv4()}`;
  } else if (this.role === 'engineer') {
    // Generate unique engineer_id
    this.engineer_id = `engineer_${uuidv4()}`;
  }
  next(); // Continue with the save operation
});

// Project Schema
const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
    unique: true, // Ensure project_id is unique
    required: [true, "Project ID is required"],
    default: () => `project_${uuidv4()}`, // Default value using UUID for uniqueness
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUP',
    required: [true, "Client ID is required"],
  },
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  landarea: {
    type: Number,
    required: [true, "Project land area is required"],
  },
  building_type: {
    type: String,
    required: [true, "Project building type is required"],
  },
  budget: {
    type: Number,
    required: [true, "Project budget is required"],
  },
  timeline: {
    type: String,
    required: [true, "Project timeline is required"],
  },
});

// Contract Schema
const contractSchema = new mongoose.Schema({
  contract_id:{
    type: String,
    unique: true, // Ensure Contract_id is unique
    required: [true, "contract ID is required"],
    default: () => `project_${uuidv4()}`, // Default value using UUID for uniqueness
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, "Project ID is required"],
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUP',
    required: [true, "Client ID is required"],
  },
  engineer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUP',
    required: [true, "Engineer ID is required"],
  },
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  landarea: {
    type: Number,
    required: [true, "Project land area is required"],
  },
  building_type: {
    type: String,
    required: [true, "Project building type is required"],
  },
  budget: {
    type: Number,
    required: [true, "Project budget is required"],
  },
  timeline: {
    type: String,
    required: [true, "Project timeline is required"],
  },
  terms_conditions: {
    type: String,
    required: [true, "Terms and conditions are required"],
  },
});

// Message Schema
const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUP',
    required: [true, "Sender ID is required"],
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUP',
    required: [true, "Receiver ID is required"],
  },
  content: {
    type: String,
    required: [true, "Message content is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Review Schema (for Engineer)
const reviewSchema = new mongoose.Schema({
  engineer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUP', // Referring to the SignUP model to get the engineer's details
    required: [true, "Engineer ID is required"], // Engineer being reviewed
  },
  review_text: {
    type: String,
    required: [true, "Review text is required"], // The actual review provided by the client
  },
  rating: {
    value: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating value is required"], // Rating for the engineer (1 to 5)
    },
    comments: {
      type: String, // Optional additional comments about the engineer
    },
  },
});

// Models
const SignUP = mongoose.model('SignUP', signupSchema);
const Project = mongoose.model('Project', projectSchema);
const Contract = mongoose.model('Contract', contractSchema);
const Message = mongoose.model('Message', messageSchema);
const Review = mongoose.model('Review', reviewSchema);

// Export Models
module.exports = {
  SignUP,
  Project,
  Contract,
  Message,
  Review,
};
