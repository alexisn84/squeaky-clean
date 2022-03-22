const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookings: [Booking]
    reviews: [Review]
  }

  type Maid {
    _id: ID
    name: String
    reviews: [Review]
    bookings: [Booking]
    userRatings: [UserRating]
  }

  type Review {
    _id: ID
    reviewText: String
    createdAt: String
    createdByUser_id: String
    createdForMaid_id: String    
  }

  type UserRating {
    _id: ID
    ratingNum: Int
    createdAt: String
    createdByMaid_id: String
    createdForUser_id: String
  }
 
  type Booking {
    _id: ID
    bookingLocation: String
    user_id: String
    maid_id: String
    paymentPending: Boolean
    paymentAmount: Number
    createdAt: String
  }

  type Slot {
    start: Int
    finish: Int
  }

  type Schedule {
    _id: ID
    schedule: String
    maidName: String
    date: String
    slots: [Slot]
  }

  type Auth {
    token: ID
    user: User
    maid: Maid
  }

  type Query {
    me: User
    users: [User]
    maid: Maid
    maids: [Maid]
    schedule(maidName: String): [Schedule]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID!): Review
    bookings: [Booking]
    booking(_id: ID!): Booking
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    createReview(reviewText: String!): Review
    addRating(reviewId: ID!, ratingBody: String!): userRating
    addBooking(scheduleId: ID!): Booking
    cancelBooking(bookingId: ID!): Schedule
  }
`;

module.exports = typeDefs;