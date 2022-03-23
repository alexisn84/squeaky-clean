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
    serviceRating: {
      type: Number,
      min: [1, 'Must be 1, 2, 3, 4, or 5'],
      max: [5, 'Must be 1, 2, 3, 4, or 5'],
      default: 3
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
    },
    booking_id: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
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