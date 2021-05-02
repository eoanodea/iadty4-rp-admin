/**
 * This file defines type for various objects associated with Question
 *
 * Primarily used within the CreateQuestion Stepper
 */

export interface IItem {
  id: number;
  text: string;
  note?: string;
}

export interface IListItem extends IItem {
  i: number;
}

// Validator for QuestionText
interface QuestionTextValidator {
  id?: string;
  __typename?: string;
  // The order of where the question text will appear (starting at 0)
  order: number;

  // The text of the question text
  text: string;

  // The ID of the Note this text is associated with, if not provided the text will default to be not a link
  note?: string;
}

export interface QuestionValidator {
  [key: string]: any;
  __typename?: string;
  id?: string;
  lessonId: string;
  requiresPiano: boolean;
  text: QuestionTextValidator[];
  image: string;
  options: string[];
  type: string;
  points: number;
  answer: string;
  answerArr: string[];
  answerHint: string;
  questionTypeOptions: string[];
}
