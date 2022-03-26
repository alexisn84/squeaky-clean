import { gql } from '@apollo/client';

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

//for checkout with Stripe
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
    user(name: $name) {
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

//for maid list to show user single maid with reviews
export const QUERY_MAID = gql`
  query maid($maid: String) {
    user(name: $name) {
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

//for maid dashboard
export const QUERY_EMPL = gql`
  query maids($maid: String) {
    user(name: $name) {
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

export const QUERY_REVIEWS = gql`
  query reviewsByUser($createdByUser_id: ID!) {
    reviewsByUser(createdByUser_id: $createdByUser_id) {
      _id
      reviewText
      createdAt
    }
  }
`;

//for user to edit single review
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

//to pull into maiddashboard
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