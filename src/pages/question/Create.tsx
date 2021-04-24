import React, { useState } from "react";
import {
  Button,
  Card,
  TextField,
  CardHeader,
  CardContent,
  createStyles,
  withStyles,
  CardActions,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import { ArrowBack, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import { CREATE } from "../../gql/question";
import CreateQuestion from "./../../components/question/CreateQuestion";

type IProps = {
  history: any;
  match: any;
  classes: any;
};

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: any) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });
/**
 * CreateQuestion Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Create = ({ history, classes }: IProps) => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState();
  const [questionType, setQuestionType] = useState("");
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answerArr, setAnswerArr] = useState([]);
  const [answerHint, setAnswerHint] = useState("");

  const [textError, setTextError] = useState("");
  const [optionsError, setOptionsError] = useState("");
  const [imageError, setImageError] = useState("");
  const [questionTypeError, setQuestionTypeError] = useState("");
  const [pointsError, setPointsError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [answerArrError, setAnswerArrError] = useState("");
  const [answerHintError, setAnswerHintError] = useState("");

  const [serverError, setServerError] = useState("");

  const [addQuestion, { loading }] = useMutation(CREATE);

  const handleValidation = () => {
    let isValid = false;
    // if (title.length < 3) {
    //   setTitleError("Title must be at least 3 characters");
    // } else {
    //   isValid = true;
    //   setTitleError("");
    // }

    return isValid;
  };

  const submit = () => {
    if (handleValidation()) {
      setServerError("");

      // addQuestion({
      //   variables: {
      //     input: {
      //       title,
      //       level,
      //       type,
      //     },
      //   },
      // })
      //   .then((res: any) => {
      //     // history.push(`/question/${res.data.addQuestion.id}`);
      //     history.push(`/questions/true`);
      //   })
      //   .catch((e) => {
      //     setServerError(e.toString());
      //   });
    }
  };

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>

      <CreateQuestion />
    </React.Fragment>
  );
};

export default withStyles(styles)(Create);
