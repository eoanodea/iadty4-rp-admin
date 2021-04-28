import {
  Button,
  createStyles,
  FormHelperText,
  makeStyles,
  Fade,
  Theme,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useQuestion } from "..";
import { QuestionValidator } from "../../../../types/question";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      margin: theme.spacing(3),
    },
  })
);

const QuestionAnswer = () => {
  const classes = useStyles();
  const [question, setQuestion] = useQuestion();
  const [isMultiAnswer, setIsMultieAnswer] = useState(
    question.type === "MULTIPLE_CHOICE"
  );

  const handleChange = (value: string) => {
    let newQuestion = question;
    newQuestion.answer = value.replace(" ", "_").toUpperCase();

    setQuestion(newQuestion);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Select Question Answer</Typography>
      <FormControl component="fieldset">
        <FormControlLabel
          label={
            isMultiAnswer ? "Multiple Options Answer" : "Single Option Answer"
          }
          control={
            <Switch
              checked={isMultiAnswer}
              onChange={() => setIsMultieAnswer((o) => !o)}
              name="Multiple Options Answers"
            />
          }
        />
        <FormHelperText>
          {isMultiAnswer
            ? "The user will enter a single answer"
            : "The user will select multiple items as an answer"}
        </FormHelperText>
      </FormControl>

      {question.type === "MULTIPLE_CHOICE" ? (
        <Autocomplete
          id="select-question-answer"
          options={question.options}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value) => handleChange(value || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Question Answer"
              variant="outlined"
            />
          )}
        />
      ) : (
        <h1>Not multi choice</h1>
      )}
    </div>
  );
};
export default QuestionAnswer;
