const { model, Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ratingSchema = new Schema(
  {
    ratingNum: {
      type: Number,
      required: true
    },
    createdByMaid_id: {
      type: Schema.Types.ObjectId,
      ref: 'Maid',
      required: true
    },
    createdForUser_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
const UserRating = model('UserRating', ratingSchema);
module.exports = UserRating;