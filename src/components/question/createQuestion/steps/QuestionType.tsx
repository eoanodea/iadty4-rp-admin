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
    },
  })
);

/**
 * QuestionType Component
 *
 * Allows the user to select the type of question
 */
const QuestionType = () => {
  const classes = useStyles();
  const [question, setQuestion] = useQuestion();

  /**
   * Fetch the options from the server
   *
   * There was a bug here where on deployment the options wouldn't fetch sometimes,
   * so a fallback to check if they exist, and if not, deliver hard coded options
   */
  const options =
    question.questionTypeOptions.length < 1
      ? ["Multiple Choice", "Text"]
      : question.questionTypeOptions;

  /**
   * Handle selecting an option for the question type
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question;
    newQuestion.type = capitalize(
      (event.target as HTMLInputElement).value.replace("_", " ").toLowerCase()
    );

    setQuestion({ ...newQuestion });
  };

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
   * Render JSX
   */
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
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default QuestionType;
