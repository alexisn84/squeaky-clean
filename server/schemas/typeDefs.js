const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String
    bookings: [Booking]
    reviews: [Review]
}

  type Maid {
    _id: ID
    name: String
    reviews: [Review]
  }

  type Review {
    _id: ID
    reviewText: String
    createdAt: String
    username: String
    ratingCount: Int
    ratings: [Rating]
  }

  type Rating {
    _id: ID
    ratingNum: Int
    ratingBody: String
    createdAt: String
    username: String
  }

  type Booking {
    _id: ID
    schedule: Schedule!
    user: User!
    createdAt: String!
    updatedAt: String!
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
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    maids: [Maid]
    schedule(maidName: String): [Schedule]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID!): Review
    bookings: [Booking!]!
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    createReview(reviewText: String!): Review
    addRating(reviewId: ID!, ratingBody: String!): Rating
    booking(scheduleId: ID!): Booking!
    cancelBooking(bookingId: ID!): Schedule!
  }
`;

module.exports = typeDefs;