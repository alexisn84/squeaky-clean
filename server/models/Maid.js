const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const maidSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a correct email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
      timestamp: true
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
maidSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
maidSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

maidSchema.virtual('reviewCount').get(function () {
  return this.reviews.length;
});

maidSchema.virtual('bookingCount').get(function () {
  return this.bookings.length;
});

const Maid = model('Maid', maidSchema);

module.exports = Maid;