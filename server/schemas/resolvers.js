const { AuthenticationError } = require('apollo-server-express');
const ObjectId = require('mongodb').ObjectId;
const { User, Maid, Booking, Review, Schedule } = require('../models');
const { signToken, maidSignToken } = require('../utils/auth');

const resolvers = {
  Query: {
    memd: async (parent, args, context) => {
      if (context.member) {
        const memberData = await Maid.findOne({ _id: context.member._id })
          .select('-__v -password')
          .populate('reviews')
          .populate('bookings');

        return memberData;
      }

      throw new AuthenticationError('Not logged in');
    },

    me: async (parent, args, context) => {
      if (context.member) {
        const memberData = await User.findOne({ _id: context.member._id })
          .select('-__v -password')
          .populate('reviews')
          .populate('bookings');

        return memberData;
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('reviews');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('reviews')
        .populate('bookings');
    },

    maids: async (parent, { name }) => {
      const params = name ? { name } : {};
      return Maid.find(params).sort({ createdAt: -1 });
    },

    maid: async (parent, { name }) => {
      return Maid.findOne({ name })
        .select('-__v -password')
        .populate('reviews')
        .populate('bookings');
    },

    reviews: async () => {
      return Review.find().sort({ createdAt: -1 });
    },

    reviewsByUser: async (parent, { createdByUser_id }) => {
      const params = createdByUser_id ? { createdByUser_id } : {};
      if (createdByUser_id) {
        return Review.find({ createdByUser_id: ObjectId(createdByUser_id) })
      }
      return Review.find(params).sort({ createdAt: -1 });
    },

    reviewsForMaid: async (parent, { createdForMaid_id }) => {
      const params = createdForMaid_id ? { createdForMaid_id } : {};
      if (createdForMaid_id) {
        return Review.find({ createdForMaid_id: ObjectId(createdForMaid_id) })
      }
      return Review.find(params).sort({ createdAt: -1 });
    },

    review: async (parent, { _id }) => {
      return Review.findOne({ _id });
    },

    bookings: async () => {
      return Booking.find().sort({ createdAt: -1 });
    },

    booking: async (parent, { _id }) => {
      return Booking.findOne({ _id });
    },

    bookingsByUser: async (parent, { user_id }) => {
      const params = user_id ? { user_id } : {};
      if (user_id) {
        return Booking.find({ user_id: ObjectId(user_id) })
      }
      return Booking.find(params).sort({ createdAt: -1 });
    },

    bookingsForMaid: async (parent, { maid_id }) => {
      const params = maid_id ? { maid_id } : {};
      if (maid_id) {
        return Booking.find({ maid_id: ObjectId(maid_id) })
      }
      return Booking.find(params).sort({ createdAt: -1 });
    },

    scheduleForMaid: async (parent, { maid_id }) => {
      const params = maid_id ? { maid_id } : {};
      if (maid_id) {
        return Schedule.find({ maid_id: ObjectId(maid_id) })
      }
      return Schedule.find(params).sort({ createdAt: -1 });
    }
  },

  Mutation: {
    signin: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials...user not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials...bad PW');
      }

      const token = signToken(user);
      return { token, user };
    },

    maidSignin: async (parent, args) => {
      const maid = await Maid.create(args);
      const token = maidSignToken(maid);

      return { token, maid };
    },

    maidLogin: async (parent, { email, password }) => {
      const maid = await Maid.findOne({ email });

      if (!maid) {
        throw new AuthenticationError('Incorrect credentials...maid not found');
      }

      const correctPw = await maid.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials...bad PW');
      }

      const token = maidSignToken(maid);
      return { token, maid };
    },

    createReview: async (parent, { reviewText, serviceRating, booking_id, user_id, maid_id }, context) => {

      if (context.member) {
        if (context.member.name) {
          throw new AuthenticationError('Maid cannot write Reviews!');
        }

        const createdReview = await Review.create({
          reviewText: reviewText,
          createdForMaid_id: maid_id,
          createdByUser_id: user_id,
          serviceRating: serviceRating,
          booking_id: booking_id,
          createdAt: Date.now(),
        });

        await Booking.updateOne(
          { _id: booking_id },
          { review: createdReview }
        );
        await Maid.updateOne(
          { _id: maid_id },
          { $push: { reviews: createdReview } }
        );
        await User.updateOne(
          { _id: user_id },
          { $push: { reviews: createdReview } }
        );

        return createdReview;
      }

      throw new AuthenticationError('Must login as a User');
    },


    createBooking: async (parent, { bookingName, bookingLocation, user_id, maid_id }, context) => {

      if (context.member) {
        if (context.member.name) {
          throw new AuthenticationError('Maid cannot create a Booking!');
        }

        const createdBooking = await Booking.create({
          bookingName: bookingName,
          bookingLocation: bookingLocation,
          maid_id: maid_id,
          user_id: user_id,
          paymentPaid: false,
          paymentAmount: 0,
          createdAt: Date.now(),
        });

        await Maid.updateOne(
          { _id: maid_id },
          { $push: { bookings: createdBooking } }
        );
        await User.updateOne(
          { _id: user_id },
          { $push: { bookings: createdBooking } }
        );

        return createdBooking;
      }

      throw new AuthenticationError('Must login as a User');
    },

    createSchedule: async (parent, { scheduleDesc, maid_id, booking_id, scheduleDate, startTime, endTime }, context) => {

      if (context.member) {
        if (context.member.name) {
          throw new AuthenticationError('Maid cannot schedule a booking!');
        }

        const createdSchedule = await Schedule.create({
          scheduleDesc: scheduleDesc,
          maid_id: maid_id,
          booking_id: booking_id,
          scheduleDate: scheduleDate,
          startTime: startTime,
          endTime: endTime
        });


        await Booking.updateOne(
          { _id: booking_id },
          { schedule_id: createdSchedule._id }
        );
        return createdSchedule;
      }

      throw new AuthenticationError('Must login as a User');
    },

    enterSchedule: async (parent, { scheduleDate, startTime, endTime }, context) => {

      if (context.member) {
        if (context.member.name) {
          throw new AuthenticationError('Maid cannot schedule a booking!');
        }

        const enteredSchedule = await Schedule.create({
          scheduleDate: scheduleDate,
          startTime: startTime,
          endTime: endTime
        });

        return enteredSchedule;
      }

      throw new AuthenticationError('Must login as a User');
    },
    //     throw new AuthenticationError('You need to be logged in!');
    //   },
    //   addRating: async (parent, { reviewId, reactionBody }, context) => {
    //     if (context.user) {
    //       const updatedReview = await Review.findOneAndUpdate(
    //         { _id: reviewId },
    //         { $push: { reactions: { reactionBody, username: context.user.username } } },
    //         { new: true, runValidators: true }
    //       );

    //       return updatedReview;
    //     }

    //     throw new AuthenticationError('You need to be logged in!');
    //}
  }
};

module.exports = resolvers;