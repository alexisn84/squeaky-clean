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
  }

  type Review {
    _id: ID
    reviewText: String
    serviceRating: Int
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
    paymentPaid: Boolean
    paymentAmount: Int
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

  type AuthUser {
    token: ID
    user: User
  }

  type AuthMaid {
    token: ID
    maid: Maid
  }

  type Checkout {
    session: ID
  }

  type Query {
    me: User
    memd: Maid
    user(username: String!): User
    users: [User]
    maid(name: String!): Maid
    maids: [Maid]
    schedule(maidName: String): [Schedule]
    reviewsByUser(createdByUser_id: ID): [Review]
    reviewsForMaid(createdForMaid_id: ID): [Review]
    reviews: [Review]
    review(_id: ID!): Review
    bookings: [Booking]
    booking(_id: ID!): Booking
    bookingsByUser(user_id: ID): [Booking]
    bookingsForMaid(maid_id: ID): [Booking]
  }
  
  type Mutation {
    userLogin(email: String!, password: String!): AuthUser
    maidLogin(name: String!, password: String!): AuthMaid
    userSignin(username: String!, email: String!, password: String!): AuthUser
    maidSignin(name: String!, password: String!): AuthMaid 
    createReview(reviewText: String!, serviceRating: Int!, booking_id: ID!, user_id: ID!, maid_id: ID!): Review
    createBooking(bookingLocation: String!, user_id: ID!, maid_id: ID!): Booking
  }
`;

module.exports = typeDefs;