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
import React, { useState } from "react";
import { useQuestion } from "..";
import { CREATE, UPDATE } from "./../../../../gql/question";
import PreviewQuestion from "./../../PreviewQuestion";

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

type IProps = {
  handleReset: () => void;
  history: any;
};

const QuestionReview = ({ handleReset, history }: IProps) => {
  const classes = useStyles();
  const [question] = useQuestion();
  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);
  const [addQuestion] = useMutation(CREATE);
  const [updateQuestion] = useMutation(UPDATE);

  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

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
