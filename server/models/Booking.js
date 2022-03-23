const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const bookingSchema = new Schema(
  {
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
    paymentPaid: {
      type: Number,
      required: true
    },
    paymentAmount: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  });

const Booking = model('Booking', bookingSchema);

module.exports = Booking;