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
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($ReviewId: ID!, $reactionBody: String!) {
    addRating(reviewId: $reviewId, ratingBody: $ratingBody) {
      _id
      ratingCount
      ratings {
        _id
        ratingBody
        createdAt
        username
      }
    }
  }
`;

