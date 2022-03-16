import { gql } from '@apollo/client';

export const QUERY_APPOINTMENTS = gql`
  query appointments($appointment: String){
    time
    date
  }
`;

export const QUERY_MAIDS = gql`
  query maids($maid: String) {
    user:(name: $name) {
      _id
      name
      ratings {
        _id
        createdAt
        ratingBody
        username
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      reviewText
      createdAt
      username
      ratingCount
      ratings {
        _id
        createdAt
        username
        ratingBody
      }
    }
  }
`;

export const QUERY_REVIEW = gql`
  query review($id: ID!) {
    review(_id: $id) {
      _id
      reviewText
      createdAt
      username
      ratingCount
      ratings {
        _id
        createdAt
        username
        ratingBody
      }
    }
  }
`;

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
