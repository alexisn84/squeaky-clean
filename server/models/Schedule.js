const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scheduleSchema = new Schema(
  {
    schedule: {
      type: String
    },
    maidName: {
      type: String
    },
    date: {
      type: Date,
      required: true,
      timestamps: true
    },
    slots: [
      {
        start: {
          type: Number,
          required: true,
          min: 9,
          max: 16
        },
        finish: {
          type: Number,
          required: true,
          min: 9,
          max: 16
        }
      }
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

scheduleSchema.virtual('availability').get(function () {
  let avail = [];
  let sortedSlots = this.slots.sort((a, b) => {
    return a.start - b.start;
  });

  // FIRST
  // if the first slot start value is >=11
  //     push { start: 9, end: start-1 } to avail array ... record end = finish
  // NEXT
  // if start value <= last end ... ERROR 

  for (let i = 0; i < this.slots.length; i++) {
    let startHr = sortedSlots[i].start;
    let endHr;
    if (i === 0 && start >= 11) {
      avail.push({ start: 9, finish: (startHr - 1) });
    } else if (startHr > (endHr + 1)) {
      avail.push({ start: endHr, finish: startHr - 1 })
      endHr = sortedSlots[i].finish;
      if (startHr >= endHr) {
        console.log("overlapping timeslots...ignoring slot: " + JSON.stringify(sortedSlots[i]));
      }
    }
  }
  console.log(JSON.stringify(avail));
  return avail;
});

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;