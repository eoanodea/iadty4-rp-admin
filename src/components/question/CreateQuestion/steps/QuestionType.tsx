import {
  Button,
  createStyles,
  FormHelperText,
  makeStyles,
  Fade,
  Theme,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question;
    newQuestion.type = (event.target as HTMLInputElement).value;
    console.log("yeehaw new", newQuestion.type);
    setQuestion({ ...newQuestion });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Select Question Type</Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Question Type</FormLabel>
        <RadioGroup
          aria-label="question-type"
          name="question-type"
          value={question.type}
          onChange={handleChange}
        >
          {question.questionTypeOptions.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              style={{ textTransform: "capitalize" }}
              label={item.replace("_", " ").toLowerCase()}
            />
          ))}
          {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
        </RadioGroup>
      </FormControl>

      {/* <Autocomplete
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
      /> */}
    </div>
  );
};
export default QuestionType;
