import { gql } from "@apollo/client";

/**
 * Login to the system
 */
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      expiration
      user {
        email
        id
      }
    }
  }
`;

/**
 * Add a new user
 */
export const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    addUser(input: { name: $name, email: $email, password: $password }) {
      id
      email
    }
  }
`;
