import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!) {
    addReview(reviewText: $reviewText) {
      _id
      reviewText
      createdAt
      username
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($BookingId: ID!, $reactionBody: String!) {
    addRating(BookingId: $BookingId, ratingBody: $ratingBody) {
      _id
      ratingCount
      ratings {
        _id
        createdAt
        username
      }
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation addBooking($bookingText: String!) {
    addbooking(bookingText: $bookingText) {
      _id
      bookingText
      createdAt
      username
      date
    }
  }
`;
