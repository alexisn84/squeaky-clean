const { AuthenticationError } = require('apollo-server-express');
const { User, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Query: {
    //     me: async (parent, args, context) => {
    //       if (context.user) {
    //         const userData = await User.findOne({ _id: context.user._id })
    //           .select('-__v -password')
    //           .populate('reviews');
    
    //         return userData;
    //       }
    
    //       throw new AuthenticationError('Not logged in');
    //     },
    //     users: async () => {
    //       return User.find()
    //         .select('-__v -password')
    //         .populate('reviews');
    //     },
    //     user: async (parent, { username }) => {
    //       return User.findOne({ username })
    //         .select('-__v -password')
    //         .populate('reviews');
    //     },
    //     reviews: async (parent, { username }) => {
    //       const params = username ? { username } : {};
    //       return Review.find(params).sort({ createdAt: -1 });
    //     },
    //     review: async (parent, { _id }) => {
    //       return Review.findOne({ _id });
    //     }
    //   },

      // Mutation: {
      //   createUser: async (parent, args) => {
      //     const user = await User.create(args);
      //     const token = signToken(user);
    
      //     return { token, user };
      //   },
      //   login: async (parent, { email, password }) => {
      //     const user = await User.findOne({ email });
    
      //     if (!user) {
      //       throw new AuthenticationError('Incorrect credentials');
      //     }
    
      //     const correctPw = await user.isCorrectPassword(password);
    
      //     if (!correctPw) {
      //       throw new AuthenticationError('Incorrect credentials');
      //     }
    
      //     const token = signToken(user);
      //     return { token, user };
      //   },
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
      //   }
      // }
    };
    
    module.exports = resolvers;