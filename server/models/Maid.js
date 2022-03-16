const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const maidSchema = new Schema (
    {
        employeename: {
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
        ]
        //will need to add schedules here most likely
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// compare the incoming password with the hashed password
maidSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  MaidSchema.virtual('reviewCount').get(function() {
    return this.reviews.length;
  });

const Maid = model('Maid', maidSchema);

module.exports = Maid;