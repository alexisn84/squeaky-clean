const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const bookingSchema = new Schema(
  {
    bookingName: {
      type: String,
      default: 'Cleaning Service'
    },
    bookingLocation: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    maid_id: {
      type: Schema.Types.ObjectId,
      ref: 'Maid'
    },
    review_id: {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
    schedule_id: {
      type: Schema.Types.ObjectId,
      ref: 'Schedule'
    },
    paymentPaid: {
      type: Boolean,
      required: true
    },
    paymentAmount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
      timestamp: true
    }
  });

const Booking = model('Booking', bookingSchema);

module.exports = Booking;