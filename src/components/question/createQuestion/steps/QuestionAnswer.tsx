import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  TextField,
  Checkbox,
} from "@material-ui/core";
import {
  CheckBoxOutlineBlank,
  CheckBox as CheckBoxIcon,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
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

const QuestionAnswer = () => {
  const classes = useStyles();
  const [question, setQuestion] = useQuestion();

  const handleMultiChoiceChange = (value: string[]) => {
    let newQuestion = question;
    newQuestion.answerArr = value;

    setQuestion(newQuestion);
  };

  const handleTextChange = (value: string) => {
    let newQuestion = question;
    newQuestion.answer = value;

    setQuestion(newQuestion);
  };

  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div className={classes.root}>
      <Typography variant="h1">Select Question Answer</Typography>

      {question.type === "MULTIPLE_CHOICE" ? (
        <Autocomplete
          id="select-question-multi-choice-answer"
          multiple
          options={question.options}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          defaultValue={question.answerArr}
          disableCloseOnSelect
          onChange={(event, value) => handleMultiChoiceChange(value || "")}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Question Answer"
              variant="outlined"
            />
          )}
        />
      ) : (
        <Autocomplete
          id="select-question-text-answer"
          defaultValue={question.answer}
          options={question.options}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value) => handleTextChange(value || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Question Answer"
              variant="outlined"
            />
          )}
        />
      )}
    </div>
  );
};
export default QuestionAnswer;
