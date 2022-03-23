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
    userRatings: String
  }

  type Review {
    _id: ID
    reviewText: String
    createdAt: String
    createdByUser_id: String
    createdForMaid_id: String    
  }

  type userRating {
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
    reviews(createdByUser_id: ID): [Review]
    review(_id: ID!): Review
    bookings: [Booking]
    booking(_id: ID!): Booking
    checkout(bookings: ID!): Checkout
  }
  
  type Mutation {
    userLogin(email: String!, password: String!): AuthUser
    maidLogin(name: String!, password: String!): AuthMaid
    createUser(username: String!, email: String!, password: String!): AuthUser
    createMaid(name: String!, password: String!): AuthMaid 
    createReview(reviewText: String!): Review
    addBooking(scheduleId: ID!): Booking
    cancelBooking(bookingId: ID!): Booking
  }
`;

module.exports = typeDefs;