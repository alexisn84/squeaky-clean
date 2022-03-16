const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scheduleSchema = new Schema (
    {
        schedule: {
            type: String,
        },
        start: {
            type: Date
        },
        finish: {
            type: Date
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = scheduleSchema;