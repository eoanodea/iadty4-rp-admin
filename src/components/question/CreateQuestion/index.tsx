import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect } from "react";
import { LIST_QUESTION_TYPE } from "../../../gql/question";

import { QuestionValidator } from "../../../types/question";
import QuestionStepper from "./QuestionStepper";

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
export const QuestionContext = createContext<
  [QuestionValidator, (setQuestion: QuestionValidator) => void]
>([initialQuestion, (_) => null]);

type IProps = {
  match: any;
  history: any;
  update?: QuestionValidator | null;
};

const CreateQuestion = ({ history, match, update = null }: IProps) => {
  const [question, setQuestion] = React.useState(initialQuestion);
  const { loading, error, data } = useQuery(LIST_QUESTION_TYPE);

  useEffect(() => {
    if (!loading && !error && data && question.questionTypeOptions.length < 1) {
      let newQuestion: any = {
        ...question,
        questionTypeOptions: data.getQuestionTypes,
        lessonId: update ? update.lesson.id : match.params.id,
      };
      if (update) {
        newQuestion = {
          ...newQuestion,
          id: update.id,
          requiresPiano: update.requiresPiano || false,
          text: update.text,
          image: update.image,
          options: update.options,
          type: update.type,
          points: update.points,
          answer: update.answer,
          answerArr: update.answerArr,
          answerHint: update.answerHint,
        };
      }

      setQuestion(newQuestion);
    }
  }, [question, data, error, loading, match.params.id, update]);

  return (
    <QuestionContext.Provider value={[question, setQuestion as any]}>
      <QuestionStepper history={history} />
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);
export default CreateQuestion;
