const { AuthenticationError } = require('apollo-server-express');
const ObjectId = require('mongodb').ObjectId;
const { User, Maid, Booking, Review } = require('../models');
const { signToken, maidSignToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.bookings',
          populate: 'booking'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ bookings: args.bookings });
      const line_items = [];

      const { bookings } = await order.populate('bookings').execPopulate();

      for (let i = 0; i < bookings.length; i++) {
        const booking = await stripe.bookings.create({
          name: bookings[i].name,
          description: bookings[i].description,
          images: [`${url}/images/${bookings[i].image}`]
        });

        const price = await stripe.prices.create({
          product: booking.id,
          unit_amount: bookings[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
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

      throw new AuthenticationError('Not logged in');
    },


    createBooking: async (parent, { bookingLocation, user_id, maid_id }, context) => {

      if (context.member) {
        if (context.member.name) {
          throw new AuthenticationError('Maid cannot create a Booking!');
        }

        const createdBooking = await Booking.create({
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

      throw new AuthenticationError('Not logged in');
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
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