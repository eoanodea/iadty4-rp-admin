import { gql } from "@apollo/client";

/**
 * Fetch a list of questions
 */
export const LIST = gql`
  query getQuestions {
    getQuestions {
      id
      title
      level
      lessons {
        id
      }
    }
  }
`;

/**
 * Fetch a question by ID
 *
 * @param {id: String}
 */
export const READ = gql`
  query getQuestions($id: String!) {
    getQuestion(id: $id) {
      id
      title
      level
      type
      createdAt
      lessons {
        id
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * Create a new question
 *
 * @param {input: QuestionValidator}
 */
export const CREATE = gql`
  mutation addQuestion($input: QuestionValidator!) {
    addQuestion(input: $input) {
      id
    }
  }
`;

/**
 * Update a question by ID
 *
 * @param {id: String!}
 * @param {input: QuestionValidator}
 */
export const UPDATE = gql`
  mutation updateQuestion($id: String!, $input: QuestionValidator!) {
    updateQuestion(id: $id, input: $input) {
      id
      title
      level
      type
    }
  }
`;

/**
 * Delete a question by ID
 *
 * @param {id: String!}
 * @returns {boolean}
 */
export const DELETE = gql`
  mutation deleteQuestion($id: String!) {
    deleteQuestion(id: $id)
  }
`;