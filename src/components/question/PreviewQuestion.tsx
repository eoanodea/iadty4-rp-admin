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
import { config } from "../../config/config";
import PreviewDocument from "./../../helpers/PreviewImage";
import { QuestionValidator } from "./../../types/question";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
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

/**
 * Component Types
 */
type IProps = {
  question: QuestionValidator;
};

/**
 * PreviewQuestion Component
 *
 * @param {QuestionValidator} question - the Question object
 */
const PreviewQuestion = ({ question }: IProps) => {
  const classes = useStyles();

  const items = [...question.text].sort((a: any, b: any) => a.order - b.order);

  /**
   * Render JSX
   */
  return (
    <Card className={classes.previewContainer}>
      <Typography variant="h3">
        {items.map((item) => {
          if (item.note) {
            return (
              <React.Fragment key={item.text}>
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

      <PreviewDocument
        photo={
          question.image.includes("base64")
            ? question.image
            : config.server_url + "/images/" + question.image
        }
      />
      <div>
        {question.options.map((option) => {
          return (
            <Chip key={option} label={option} className={classes.optionChip} />
          );
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
