const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scheduleSchema = new Schema(
  {
    scheduleDesc: {
      type: String,
      default: 'Cleaning Job'
    },
    maid_id: {
      type: Schema.Types.ObjectId,
      ref: 'Maid'
    },
    booking_id: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    },
    scheduleDate: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
    },
    status: {
      type: String,
      match: [/^complete|working|scheduled|canceled?/, 'Schedule status must be "complete", "working", "scheduled", or "canceled"!'],
      default: 'scheduled'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
      timestamp: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;