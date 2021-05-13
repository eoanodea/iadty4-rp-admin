import { gql } from "@apollo/client";

/**
 * Login to the system
 */
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    adminLogin(input: { email: $email, password: $password }) {
      token
      expiration
      user {
        email
        id
      }
    }
  }
`;
