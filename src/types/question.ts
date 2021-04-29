export interface IItem {
  id: number;
  text: string;
}

export interface IListItem extends IItem {
  i: number;
}

// Validator for QuestionText
interface QuestionTextValidator {
  // The order of where the question text will appear (starting at 0)
  order: number;

  // The text of the question text
  text: string;

  // The ID of the Note this text is associated with, if not provided the text will default to be not a link
  note?: string;
}

export interface QuestionValidator {
  [key: string]: any;
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
