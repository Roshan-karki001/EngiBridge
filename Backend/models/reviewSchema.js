const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, "Project ID is required"],
  },
  review_text: {
    type: String,
    required: [true, "Review text is required"],
  },
  rating: {
    value: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating value is required"],
    },
    comments: {
      type: String,
      required: [false],
    },
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
