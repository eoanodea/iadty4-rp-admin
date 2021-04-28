import {
  Button,
  createStyles,
  FormHelperText,
  makeStyles,
  Fade,
  Theme,
  Typography,
  TextField,
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

const QuestionType = () => {
  const classes = useStyles();
  const [question, setQuestion] = useQuestion();

  const handleChange = (value: string) => {
    let newQuestion = question;
    newQuestion.type = value.replace(" ", "_").toUpperCase();

    setQuestion(newQuestion);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Select Question Type</Typography>

      <Autocomplete
        id="select-question-type"
        options={question.questionTypeOptions}
        getOptionLabel={(option) => option.replace("_", " ").toLowerCase()}
        style={{ width: 300 }}
        defaultValue={question.type}
        onChange={(event, value) => handleChange(value || "")}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Question Type"
            variant="outlined"
            style={{ textTransform: "capitalize" }}
          />
        )}
      />
    </div>
  );
};
export default QuestionType;
