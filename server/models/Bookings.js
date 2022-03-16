const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const bookingSchema = new Schema (
    {
        slot: {
            type: Schema.Types.ObjectId,
            ref: 'Schedule'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Booking = model('Booking', bookingSchema);

module.exports = Booking;