const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const maidSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
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
    schedules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// compare the incoming password with the hashed password
maidSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

maidSchema.virtual('reviewCount').get(function () {
  return this.reviews.length;
});

maidSchema.virtual('scheduleCount').get(function () {
  return this.schedules.length;
});

maidSchema.virtual('avgRating').get(function () {
  let sumRatings = 0;
  let numOfValidRatings = 0;
  for (let i = 0; i < this.reviews.length; i++) {
    if (this.reviews[i] &&
      this.reviews[i].rating >= 1 &&
      this.reviews[i].rating <= 5) {

      numOfValidRatings++;
      sumRatings = sumRatings + this.reviews[i].rating;
    }
  }

  return Math.round(((sumRatings/validRating) + Number.EPSILON) * 100) / 100;
});

const Maid = model('Maid', maidSchema);

module.exports = Maid;