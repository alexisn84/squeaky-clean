import { gql } from '@apollo/client';

// view list of upcoming bookings pages/UserDashboard.js; 
// block out times that are booked already pages/Booking.js
export const QUERY_BOOKINGS = gql`
  query getbookings($booking: String){
    _id
    name
    description
    price
    quantity
    time
    date
  }
`;

export const QUERY_ALL_BOOKINGS = gql`
  {
    bookings {
      _id
      name
      description
      price
      quantity
      time
      date
    }
  }
`;

//for checkout with Stripe components/Cart
export const QUERY_CHECKOUT = gql`
  query getPayment($products: [ID]!) {
    checkout(bookings: $bookings) {
      session
    }
  }
`;


// pages/UserDashboard.js (might not use here though)
// pages/MdReviewList.js
export const QUERY_MAIDS = gql`
  query maids($maid: String) {
    user:(name: $name) {
      _id
      name
      ratings {
        _id
        createdAt
        username
      }
    }
  }
`;

// pages/MaidDashboard; pages/MdReviewList.js
export const QUERY_MAID = gql`
  query maid($maid: String) {
    user:(name: $name) {
      _id
      name
      reviews {
        _id
        reviewText
        username
      }
    }
  }
`;

// pages/MaidDashboard.js
export const QUERY_EMPL = gql`
  query maids($maid: String) {
    user:(name: $name) {
      _id
      name
      ratingCount
      bookings {
        _id
        time
        date
      }
      reviews {
        _id
        createdAt
        reviewBody
        username
      }
    }
  }
`;

// for User to see a Maid with their Reviews. pages/MdReviewList.js
// for User to see reviews they have left. either pages/UserDashboard.js or components/ReviewList
export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      reviewText
      createdAt
      username
      maid_id
    }
  }
`;

//for user to edit single review. pages/SingleReview.js
export const QUERY_REVIEW = gql`
  query review($id: ID!) {
    review(_id: $id) {
      _id
      reviewText
      createdAt
      username
    }
  }
`;

//pages/UserDashboard.js
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        reviewText
        createdAt
        ratingCount
      }
      bookings {
        slot
        createdAt
      }
      ratings {
        _id
      }
    }
  }
`;

//pages/UserDashboard.js
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      
      reviews {
        _id
        reviewText
        createdAt
        ratingCount
        ratings {
          _id
          createdAt
          ratingBody
          username
        }
        bookings {
          slot
          createdAt
        }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
