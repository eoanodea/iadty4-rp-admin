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

export const LIST_QUESTION_TYPE = gql`
  query getQuestionTypes {
    getQuestionTypes
  }
`;

/**
 * Fetch a question by ID
 *
 * @param {id: String}
 */
export const READ = gql`
  query getQuestion($id: String!) {
    getQuestion(id: $id) {
      id
      image
      type
      createdAt
      options
      points
      answer
      answerArr
      answerHint
      text {
        id
        text
        order
      }
      lesson {
        id
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
  mutation addQuestion($lessonId: String!, $input: QuestionValidator!) {
    addQuestion(lessonId: $lessonId, input: $input) {
      id
      lesson {
        id
      }
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
      lesson {
        id
      }
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
