const { AuthenticationError } = require('apollo-server-express');
const ObjectId = require('mongodb').ObjectId;
const { User, Maid, Booking, Review } = require('../models');
const { signUserToken, signMaidToken } = require('../utils/auth');

//import Stripe package
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    memd: async (parent, args, context) => {
      if (context.maid) {
        const maidData = await Maid.findOne({ _id: context.maid._id })
          .select('-__v -password')
          .populate('reviews');

        return maidData;
      }

      throw new AuthenticationError('Not logged in');
    },
    
    //single user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('reviews')
          .populate('bookings');

        return userData;
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
    maids: async (parent, {name}) => {
      const params = name ? { name } : {};
      return Maid.find(params).sort({createdAt: -1 });
    },
    maid: async (parent, { name }) => {
      return Maid.findOne({ name })
        .select('-__v -password')
        .populate('reviews')
        .populate('bookings');
    },
    reviews: async (parent, { createdByUser_id }) => {
      const params = createdByUser_id ? { createdByUser_id } : {};
      if (createdByUser_id) {
        return Review.find({createdByUser_id: ObjectId(createdByUser_id)})
      }
      return Review.find(params).sort({ createdAt: -1 });
    },
    review: async (parent, { _id }) => {
      return Review.findOne({ _id });
    },
    bookings: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    booking: async (parent, { _id }) => {
      return Booking.findOne({ _id });
    },
    checkout: async (parent, args, context) => {
      const order = new Order({ bookings: args.bookings });
      const { bookings } = await order.populate('bookings').execPopulate();

      const line_items = [];

      for (let i = 0; i < bookings.length; i++) {
        // generate booking id
        const booking = await stripe.bookings.create({
          name: bookings[i].name,
          description: bookings[i].description
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          booking: booking.id,
          unit_amount: bookings[i].price * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel'
      });
      
      return { session: session.id };
    }
   },

   Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signUserToken(user);

      return { token, user };
    },
    createMaid: async (parent, args) => {
      const maid = await Maid.create(args);
      const token = signMaidToken(maid);

      return { token, maid };
    },
    userLogin: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signUserToken(user);
      return { token, user };
    },
    maidLogin: async (parent, { name, password }) => {
      const maid = await Maid.findOne({ name });

      if (!maid) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await maid.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signMaidToken(maid);
      return { token, maid };
    },
  //   createReview: async (parent, args, context) => {
  //     if (context.user) {
  //       const review = await Review.create({ ...args, username: context.user.username });

  //       await User.findByIdAndUpdate(
  //         { _id: context.user._id },
  //         { $push: { reviews: review._id } },
  //         { new: true }
  //       );

  //       return review;
  //     }

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