import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  TextField,
  Slider,
} from "@material-ui/core";
import { useQuestion } from "./../CreateQuestion";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      margin: theme.spacing(3),
    },
  })
);

const QuestionDetails = () => {
  const classes = useStyles();
  const [question, setQuestion] = useQuestion();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Enter Question Details</Typography>

      <TextField
        value={question.answerHint}
        onChange={(e) =>
          setQuestion({ ...question, answerHint: e.target.value as string })
        }
        helperText={"A hint to the user after they answer a question incorrect"}
      />

      <Typography id="points-slider" gutterBottom>
        Points
      </Typography>
      <Slider
        defaultValue={25}
        onChange={(e, value) =>
          setQuestion({ ...question, points: value as number })
        }
        aria-labelledby="points-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={100}
      />
    </div>
  );
};
export default QuestionDetails;
