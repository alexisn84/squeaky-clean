const { Schema, model } = require('mongoose');
const ratingSchema = require('./Rating');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: 'Please leave a review!',
      minlength: 10,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    maid_id: {
      type: String,
      required: true
    },
    ratings: [ratingSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

reviewSchema.virtual('ratingCount').get(function() {
  return this.reactions.length;
});

const Review = model('Review', reviewSchema);

module.exports = Review;
