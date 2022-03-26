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
    email: String
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
    bookingName: String
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
    scheduleDesc: String
    maid_id: String
    booking_id: String
    scheduleDate: String
    startTime: String
    endTime: String
    status: String
  }

  type Auth {
    token: ID
    user: User
  }

  type MaidAuth {
    token: ID
    maid: Maid
  }

  type Order {
    _id: ID
    purchaseDate: String
    bookings: [Booking]
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
    bookingsByUser(user_id: ID!): [Booking]
    bookingsForMaid(maid_id: ID!): [Booking]
    scheduleForMaid(maid_id: ID!): [Schedule]
    order(bookings_id: ID!): Order
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    signin(username: String!, email: String!, password: String!): Auth
    maidLogin(email: String!, password: String!): MaidAuth
    maidSignin(name: String!, email: String!, password: String!): MaidAuth
    createReview(reviewText: String!, serviceRating: Int!, booking_id: ID!, user_id: ID!, maid_id: ID!): Review
    createBooking(bookingName: String, bookingLocation: String!, user_id: ID!, maid_id: ID!): Booking
    createSchedule(scheduleDesc: String, maid_id: ID!, booking_id: ID!, scheduleDate: String!, startTime: String!, endTime: String): Schedule
    enterSchedule(scheduleDate: String!, startTime: String!, endTime: String): Schedule
    addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;