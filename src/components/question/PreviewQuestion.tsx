import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button,
  Card,
  Chip,
} from "@material-ui/core";
import React from "react";
import PreviewDocument from "./../../helpers/PreviewImage";
import { QuestionValidator } from "./../../types/question";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      textAlign: "center",
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      height: "55vh",
    },
    optionChip: {
      background: "#e0e0e06b",
      borderRadius: 8,
      fontWeight: 800,
      margin: theme.spacing(1),
    },
    doneButton: {
      width: "90%",
    },
  })
);

type IProps = {
  question: QuestionValidator;
};

const PreviewQuestion = ({ question }: IProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.previewContainer}>
      <Typography variant="h3">
        {question.text.map((item) => {
          if (item.note) {
            return (
              <React.Fragment>
                <span style={{ color: "#ff9100", textDecoration: "underline" }}>
                  {item.text}
                </span>
                <span> </span>
              </React.Fragment>
            );
          }
          return item.text + " ";
        })}
      </Typography>
      <PreviewDocument photo={question.image} />
      <div>
        {question.options.map((option) => {
          return <Chip label={option} className={classes.optionChip} />;
        })}
      </div>
      <Button
        variant="contained"
        disabled
        className={classes.doneButton}
        onClick={() => {}}
      >
        Done
      </Button>
    </Card>
  );
};

export default PreviewQuestion;
