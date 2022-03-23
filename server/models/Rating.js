const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ratingSchema = new Schema(
  {
    userRating: {
      type: Number
    },
    ratingNum: {
      type: Number,
      required: true
    },
    maidname: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = ratingSchema;