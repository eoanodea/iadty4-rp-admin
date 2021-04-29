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
};

const CreateQuestion = ({ history, match }: IProps) => {
  const [question, setQuestion] = React.useState(initialQuestion);
  const { loading, error, data } = useQuery(LIST_QUESTION_TYPE);

  useEffect(() => {
    if (!loading && !error && data) {
      setQuestion((question) => {
        question.questionTypeOptions = data.getQuestionTypes;
        question.lessonId = match.params.id;
        return { ...question };
      });
    }
  }, [data, error, loading, match.params.id]);

  return (
    <QuestionContext.Provider value={[question, setQuestion as any]}>
      <QuestionStepper history={history} />
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);
export default CreateQuestion;
