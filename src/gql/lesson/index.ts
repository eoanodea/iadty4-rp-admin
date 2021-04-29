import { gql } from "@apollo/client";

/**
 * Fetch a list of lessons
 */
export const LIST = gql`
  query getLessons {
    getLessons {
      id
      module {
        id
        title
      }
      questions {
        id
        text {
          text
        }
      }
    }
  }
`;

/**
 * Fetch a lesson by ID
 *
 * @param {id: String}
 */
export const READ = gql`
  query getLesson($id: String!) {
    getLesson(id: $id) {
      id
      createdAt
      updatedAt
      module {
        id
        title
      }
      questions {
        id
        image
        text {
          text
        }
      }
    }
  }
`;

/**
 * Create a new lesson
 *
 * @param {input: LessonValidator}
 */
export const CREATE = gql`
  mutation addLesson($module: String!, $input: LessonValidator!) {
    addLesson(module: $module, input: $input) {
      id
    }
  }
`;

/**
 * Update a lesson by ID
 *
 * @param {id: String!}
 * @param {input: LessonValidator}
 */
export const UPDATE = gql`
  mutation updateLesson($id: String!, $input: LessonValidator!) {
    updateLesson(id: $id, input: $input) {
      id
      title
      level
      type
    }
  }
`;

/**
 * Delete a lesson by ID
 *
 * @param {id: String!}
 * @returns {boolean}
 */
export const DELETE = gql`
  mutation deleteLesson($id: String!) {
    deleteLesson(id: $id)
  }
`;
