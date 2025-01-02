const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Client ID is required"],
  },
  title: {
    type: String,
    required: [true, "Project title is required"],
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

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
