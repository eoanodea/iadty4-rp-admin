import { useQuery } from "@apollo/client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { LIST_QUESTION_TYPE, READ } from "../../../gql/question";

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

// const FetchExistingQuestion = (id: string) => {

//   if (loading) return "Loading";
//   if (data && data.getQuestion) return { success: true, data };
//   if (error) return { success: false, error: error.message };
// };

const CreateQuestion = ({ history, match, update = null }: IProps) => {
  const [question, setQuestion] = React.useState(initialQuestion);
  const { loading, error, data } = useQuery(LIST_QUESTION_TYPE);

  // const fetchExistingQuestion = useCallback(() => {
  //   const {loading: questionLoading, error: questionError, data: questionData} = useQuery(READ)

  // }, [])

  useEffect(() => {
    if (!loading && !error && data) {
      setQuestion((question) => {
        question.questionTypeOptions = data.getQuestionTypes;
        if (!update) question.lessonId = match.params.id;
        return { ...question };
      });
    }

    if (update) {
      console.log("here is data!", update);
      const newQuestion: any = {
        ...question,
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
      console.log("here", newQuestion);
      setQuestion(newQuestion);
      // console.log("new question!", newQuestion);
      // setQuestion((question) => {
      //   return { question, ...update };
      // });
      // const questionData = FetchExistingQuestion(match.params.id);
      // console.log("here is data!!", questionData);
    }
  }, [data, error, loading, match.params.id, update]);

  return (
    <QuestionContext.Provider value={[question, setQuestion as any]}>
      <QuestionStepper history={history} />
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => useContext(QuestionContext);
export default CreateQuestion;
