const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
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
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    createdReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

const User = model('User', userSchema);

module.exports = User;
