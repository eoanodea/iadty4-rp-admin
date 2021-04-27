import React, { createContext, useContext } from "react";

import { QuestionValidator } from "../../../types/question";
import QuestionStepper from "./QuestionStepper";

const QuestionContext = createContext<
  [QuestionValidator[], (setQuestions: QuestionValidator[]) => void]
>([[], (_) => null]);

const CreateQuestion = () => {
  const [questions, setQuestions] = React.useState<QuestionValidator[]>([]);

  return (
    <QuestionContext.Provider value={[questions, setQuestions]}>
      <QuestionStepper />
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);
export default CreateQuestion;
