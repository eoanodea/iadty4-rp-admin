import { gql } from "@apollo/client";

/**
 * Fetch a list of modules
 */
export const LIST = gql`
  query getModules {
    getModules {
      id
      title
      level
      createdAt
      lessons {
        id
      }
    }
  }
`;

/**
 * Fetch a module by ID
 *
 * @param {id: String}
 */
export const READ = gql`
  query getModule($id: String!) {
    getModule(id: $id) {
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
 * Create a new module
 *
 * @param {input: ModuleValidator}
 */
export const CREATE = gql`
  mutation addModule($input: ModuleValidator!) {
    addModule(input: $input) {
      id
    }
  }
`;

/**
 * Update a module by ID
 *
 * @param {id: String!}
 * @param {input: ModuleValidator}
 */
export const UPDATE = gql`
  mutation updateModule($id: String!, $input: ModuleValidator!) {
    updateModule(id: $id, input: $input) {
      id
      title
      level
      type
    }
  }
`;

/**
 * Delete a module by ID
 *
 * @param {id: String!}
 * @returns {boolean}
 */
export const DELETE = gql`
  mutation deleteModule($id: String!) {
    deleteModule(id: $id)
  }
`;
