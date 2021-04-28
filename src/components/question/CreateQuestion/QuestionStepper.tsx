import React from "react";

import {
  Button,
  Card,
  createStyles,
  makeStyles,
  Step,
  StepButton,
  Stepper,
  Theme,
  Typography,
} from "@material-ui/core";

import QuestionText from "./steps/QuestionText";
import QuestionImage from "./steps/QuestionImage";
import QuestionType from "./steps/QuestionType";
import QuestionAnswer from "./steps/QuestionAnswer";
import QuestionDetails from "./steps/QuestionDetails";
import QuestionOptions from "./steps/QuestionOptions";
import { useQuestion } from ".";
import Loading from "../../global/Loading";

const steps = [
  {
    title: "Add Question Text",
    name: "text",
    component: <QuestionText />,
    required: true,
  },
  {
    title: "Add Image",
    name: "image",
    component: <QuestionImage />,
    required: false,
  },
  {
    title: "Select Type",
    name: "type",
    component: <QuestionType />,
    required: true,
  },
  {
    title: "Add Options",
    name: "options",
    component: <QuestionOptions />,
    required: false,
  },
  {
    title: "Select Answer",
    name: ["answerArr", "answer"],
    component: <QuestionAnswer />,
    required: true,
  },
  {
    title: "Question Details",
    name: ["points", "answerHint"],
    component: <QuestionDetails />,
    required: true,
  },
];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
    },
    contentWrapper: {
      margin: `${theme.spacing(2)}px auto`,
    },
    buttonContainer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      padding: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);
function getSteps() {
  return steps.map((step) => step.title);
}

// function getStepContent(step: number) {
//   return steps[step].component;
// }

const QuestionStepper = () => {
  const classes = useStyles();

  const [question, setQuestion] = useQuestion();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set<number>());
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const questionSteps = steps;
  // .filter((item) => {
  //   if (question.type !== "MULTIPLE_CHOICE" && item.name === "options") {
  //     return false;
  //   }
  //   return true;
  // });

  const totalSteps = () => {
    return getSteps().length;
  };

  const getStepContent = (step: number) => {
    return questionSteps[step].component;
  };

  const isStepOptional = (step: number) => {
    return questionSteps[step].required !== true;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set<number>());
    setSkipped(new Set<number>());
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  function isStepComplete(step: number) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {questionSteps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const buttonProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            buttonProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.title} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {step.title}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <React.Fragment>
            <div className={classes.contentWrapper}>
              {getStepContent(activeStep)}
            </div>
            <Card className={classes.buttonContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {isStepOptional(activeStep) && !completed.has(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Card>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default QuestionStepper;
