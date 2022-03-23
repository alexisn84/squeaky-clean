const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: 'Please leave a review and rate the service!',
      minlength: 10,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
      timestamp: true
    },
    createdByUser_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdForMaid_id: {
      type: Schema.Types.ObjectId,
      ref: 'Maid',
      required: true
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