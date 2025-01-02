const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, "Project ID is required"],
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Client ID is required"],
  },
  engineer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Engineer ID is required"],
  },
  terms_conditions: {
    type: String,
    required: [true, "Terms and conditions are required"],
  },
});

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
