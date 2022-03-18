const { Schema, model } = require('mongoose');
const ratingSchema = require('./Rating');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: 'Please leave a review and rate the service!',
      minlength: 10,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
      timestamp: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    maidId: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Review = model('Review', reviewSchema);

module.exports = Review;
