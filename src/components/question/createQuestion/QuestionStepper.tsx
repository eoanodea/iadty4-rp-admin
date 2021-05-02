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
import { Error as ErrorIcon } from "@material-ui/icons";

import { IHistoryProps } from "../../../types/router";

import QuestionText from "./steps/QuestionText";
import QuestionImage from "./steps/QuestionImage";
import QuestionType from "./steps/QuestionType";
import QuestionAnswer from "./steps/QuestionAnswer";
import QuestionDetails from "./steps/QuestionDetails";
import QuestionOptions from "./steps/QuestionOptions";
import { useQuestion } from "./CreateQuestion";
import QuestionReview from "./steps/QuestionReview";

/**
 * Steps fed into the Stepper
 * @param {string} title - The title for the stepper
 * @param {string | array} name - The name of the field / fields to be validated on the question context
 * @param {JSX.Element} component - The component to be rendered
 * @param {boolean} required  - Whether the validator should run on this component
 */
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
    required: true,
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

/**
 * Injected styles
 *
 * @param {Theme} theme
 */
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

/**
 * Get the number of steps
 *
 * @returns {number}
 */
function getSteps() {
  return steps.map((step) => step.title);
}

/**
 * QuestionStepper Component
 *
 * @param {History} history - the browser history object
 */
const QuestionStepper = ({ history }: IHistoryProps) => {
  const classes = useStyles();

  const [question] = useQuestion();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set<number>());
  const [errors, setErrors] = React.useState(new Set<number>());
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const questionSteps = steps;

  /**
   * Get the number of steps
   *
   * @returns {number}
   */
  const totalSteps = () => {
    return getSteps().length;
  };

  /**
   * Get the content of the step
   *
   * @param {number} step
   * @returns {JSX.Element}
   */
  const getStepContent = (step: number) => {
    return questionSteps[step].component;
  };

  /**
   * Check whether the step is optional or not
   *
   * @param {number} step
   * @returns {bool}
   */
  const isStepOptional = (step: number) => {
    return questionSteps[step].required !== true;
  };

  /**
   * Check if a step is optional and if so skip the element
   */
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

  /**
   * Get the number of skipped steps
   *
   * @returns {number}
   */
  const skippedSteps = () => {
    return skipped.size;
  };

  /**
   * Get the number of completed steps
   *
   * @returns {number}
   */
  const completedSteps = () => {
    return completed.size;
  };

  /**
   * Check if all steps are completed
   *
   * @returns {bool}
   */
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  /**
   * Check if it is the last step
   *
   * @returns {bool}
   */
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  /**
   * Go to the next step
   *
   * @returns {void}
   */
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  /**
   * Go to the previous step
   *
   * @returns {void}
   */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * Step to the next step
   *
   * @returns {void}
   */
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  /**
   * Validate a step and if it passes, go to the next step
   *
   * @returns {void}
   */
  const handleComplete = () => {
    const newCompleted = new Set(completed);
    const newErrors = new Set(errors);
    setErrors(new Set());
    /**
     * Check if the step is required
     */
    if (steps[activeStep].required) {
      /**
       * Check if the step name is not a string
       */
      if (typeof steps[activeStep].name !== "string") {
        const names = steps[activeStep].name as string[];
        /**
         * Loop through and check that all fields pass validation
         */
        if (
          names.every((name) => {
            return question[name as string].length < 1;
          })
        ) {
          newErrors.add(activeStep);
          return setErrors(newErrors);
        }
      } else {
        const name = steps[activeStep].name;
        /**
         * Set the error and fail the validation
         */
        if (question[name as string].length < 1) {
          console.log("thats gotta be an error");
          newErrors.add(activeStep);
          return setErrors(newErrors);
        }
      }
    }
    /**
     * Pass validation and complete the step
     */
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

  /**
   * Reset the steps and go back to step 1
   */
  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set<number>());
    setSkipped(new Set<number>());
  };

  /**
   * Check if a step has been skipped
   */
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  /**
   * Check if a step is completed
   */
  function isStepComplete(step: number) {
    return completed.has(step);
  }
  /**
   * Check if a step contains an error
   */
  function isStepError(step: number) {
    return errors.has(step);
  }
  /**
   * Render JSX
   */
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
              {isStepError(index) ? (
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                  icon={<ErrorIcon />}
                  style={{ color: "red" }}
                  {...buttonProps}
                >
                  {step.title}
                </StepButton>
              ) : (
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                  {...buttonProps}
                >
                  {step.title}
                </StepButton>
              )}
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <QuestionReview history={history} handleReset={handleReset} />
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Next"}
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
