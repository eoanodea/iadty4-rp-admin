import { gql } from "@apollo/client";

/**
 * Fetch a list of questions
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
