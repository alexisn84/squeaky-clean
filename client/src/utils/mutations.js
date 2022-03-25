import { gql } from '@apollo/client';

// pages/Login.js; 
// pages/MaidLogin (might need one just for maid?)
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

// pages/Signup.js
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

// user leave review for past cleaning. pages/UserDashboard.js
// potentially also on the review form. components/ReviewForm
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


// maid leave rating on customer. pages/MaidDashboard.js
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

// to go to calendar to book appt. pages/UserDashboard.js
// to add to cart for payment. pages/Success.js
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

//might not need, if we do it should be going to pages/Payment.js
export const ADD_ORDER = gql`
  mutation addOrder($bookings: [ID]!) {
    addOrder(bookings: $bookings) {
      purchaseDate
      bookings {
        _id
        name
        description
        price
        quantity
      }
    }
  }
`;