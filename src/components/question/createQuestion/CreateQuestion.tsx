import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect } from "react";
import { IHistoryProps } from "../../../types/router";
import { LIST_QUESTION_TYPE } from "./../../../gql/question";

import { QuestionValidator } from "./../../../types/question";
import QuestionStepper from "./QuestionStepper";

/**
 * Initial Question Context
 */
const initialQuestion = {
  lessonId: "",
  requiresPiano: false,
  text: [],
  image: "",
  options: [],
  type: "",
  points: 0,
  answer: "",
  answerArr: [],
  answerHint: "",
  questionTypeOptions: [],
};

/**
 * Declaring the Question Context
 */
export const QuestionContext = createContext<
  [QuestionValidator, (setQuestion: QuestionValidator) => void]
>([initialQuestion, (_) => null]);

/**
 * Component Types
 */
interface IProps extends IHistoryProps {
  match: any;
  update?: QuestionValidator | null;
}

/**
 * CreateQuestion Component
 *
 * @param {History} history - the browser history object
 * @param {any} match - parameters being passed from the parent
 * @param {QuestionValidator | null} update - Whether the function is to update an existing question
 *  or create a new one
 */
const CreateQuestion = ({ history, match, update = null }: IProps) => {
  const [question, setQuestion] = React.useState(initialQuestion);
  const { loading, error, data } = useQuery(LIST_QUESTION_TYPE);

  useEffect(() => {
    /**
     * Get question type options from the server
     */
    if (!loading && !error && data && question.questionTypeOptions.length < 1) {
      let newQuestion: any = {
        ...question,
        questionTypeOptions: data.getQuestionTypes,
        lessonId: update ? update.lesson.id : match.params.id,
      };
      /**
       * If an existing question exists, add it to the question context
       */
      if (update) {
        newQuestion = {
          ...newQuestion,
          id: update.id,
          requiresPiano: update.requiresPiano || false,
          image: update.image,
          options: update.options,
          type: update.type,
          points: update.points,
          answer: update.answer,
          answerArr: update.answerArr,
          answerHint: update.answerHint,
        };
        const items = [...update.text].sort(
          (a: any, b: any) => a.order - b.order
        );

        newQuestion.text = items;
      }

      setQuestion(newQuestion);
    }
  }, [question, data, error, loading, match.params.id, update]);

  /**
   * Render JSX and define the QuestionContext
   */
  return (
    <QuestionContext.Provider value={[question, setQuestion as any]}>
      <QuestionStepper history={history} />
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);
export default CreateQuestion;
