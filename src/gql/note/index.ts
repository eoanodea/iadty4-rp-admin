import { gql } from "@apollo/client";

/**
 * Fetch a list of notes
 */
export const LIST = gql`
  query getNotes {
    getNotes {
      id
      title
      markdown
      sanitizedHtml
    }
  }
`;

/**
 * Fetch a note by ID
 *
 * @param {id: String}
 */
export const READ = gql`
  query getNote($id: String!) {
    getNote(id: $id) {
      id
      title
      markdown
      sanitizedHtml
    }
  }
`;

/**
 * Create a new note
 *
 * @param {input: NoteValidator}
 */
export const CREATE = gql`
  mutation addNote($questionText: String!, $input: NoteValidator!) {
    addNote(questionText: $questionText, input: $input) {
      id
    }
  }
`;

/**
 * Update a note by ID
 *
 * @param {id: String!}
 * @param {input: NoteValidator}
 */
export const UPDATE = gql`
  mutation updateNote($id: String!, $input: NoteValidator!) {
    updateNote(id: $id, input: $input) {
      id
    }
  }
`;

/**
 * Delete a note by ID
 *
 * @param {id: String!}
 * @returns {boolean}
 */
export const DELETE = gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;
