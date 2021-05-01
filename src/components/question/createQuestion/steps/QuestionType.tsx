import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import React from "react";
import { useQuestion } from "./../CreateQuestion";

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

  const options =
    question.questionTypeOptions.length < 1
      ? ["Multiple Choice", "Text"]
      : question.questionTypeOptions;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question;
    newQuestion.type = capitalize(
      (event.target as HTMLInputElement).value.replace("_", " ").toLowerCase()
    );

    setQuestion({ ...newQuestion });
  };

  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Select Question Type</Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Question Type</FormLabel>
        <RadioGroup
          aria-label="question-type"
          name="question-type"
          defaultValue={question.type}
          value={capitalize(question.type.replace("_", " ").toLowerCase())}
          onChange={handleChange}
        >
          {options.map((item) => (
            <FormControlLabel
              key={item}
              value={capitalize(item.replace("_", " ").toLowerCase())}
              // defaultValue={capitalize(item.replace("_", " ").toLowerCase())}
              control={<Radio />}
              // style={{ textTransform: "capitalize" }}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default QuestionType;
