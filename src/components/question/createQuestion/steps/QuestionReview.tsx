import { useMutation } from "@apollo/client";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useState } from "react";
import { useQuestion } from "./../CreateQuestion";
import { CREATE, UPDATE } from "./../../../../gql/question";
import PreviewQuestion from "./../../PreviewQuestion";
import { IHistoryProps } from "../../../../types/router";

/**
 * Injected styles
 *
 * @param {Theme} theme
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      margin: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
);

/**
 * Component types
 */
interface IProps extends IHistoryProps {
  handleReset: () => void;
}

/**
 * QuestionReview Component
 *
 * Review the current question after all steps are completed
 */
const QuestionReview = ({ handleReset, history }: IProps) => {
  const classes = useStyles();
  const [question] = useQuestion();
  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);
  const [addQuestion] = useMutation(CREATE);
  const [updateQuestion] = useMutation(UPDATE);

  /**
   * Capitalizes a string
   *
   * @param {string} str
   * @returns {string} - the string but capitalized
   */
  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

  /**
   * Either create or update a question in on the server depending on
   * if the question has a question.id or not
   */
  const save = () => {
    setServerError("");
    setLoading(true);
    const newQuestion = {
      requiresPiano: question.requiresPiano,
      text: question.text,
      image: question.image,
      options: question.options,
      type: capitalize(question.type.replace("_", " ").toLocaleLowerCase()),
      points: question.points,
      answer: question.answer,
      answerArr: question.answerArr,
      answerHint: question.answerHint,
    };

    if (question.id) {
      updateQuestion({
        variables: {
          id: question.id,
          input: newQuestion,
        },
      })
        .then((res: any) => {
          setLoading(false);
          history.push(`/lesson/${res.data.updateQuestion.lesson.id}/true`);
        })
        .catch((e) => {
          setLoading(false);
          setServerError(e.toString());
        });
    } else {
      addQuestion({
        variables: {
          lessonId: question.lessonId,
          input: newQuestion,
        },
      })
        .then((res: any) => {
          setLoading(false);
          history.push(`/lesson/${res.data.addQuestion.lesson.id}/true`);
        })
        .catch((e) => {
          setLoading(false);
          setServerError(e.toString());
        });
    }
  };

  /**
   * Render JSX
   */
  return (
    <div className={classes.root}>
      <Typography variant="h1">All Steps Complete</Typography>
      <br />
      <Typography>This is your new question will look like:</Typography>

      <PreviewQuestion question={question} />

      <Button onClick={handleReset}>Go back</Button>
      <Button
        variant="contained"
        onClick={save}
        disabled={loading}
        color="primary"
        endIcon={loading ? <CircularProgress size={18} /> : <Check />}
      >
        Save
      </Button>

      <br />

      <Typography variant="caption" color="error">
        {serverError}
      </Typography>
    </div>
  );
};
export default QuestionReview;
