import React from "react";

import {
  withStyles,
  createStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Theme,
} from "@material-ui/core";

import { Close, Delete } from "@material-ui/icons";
import { DELETE } from "./../../gql/question";
import { useMutation } from "@apollo/client";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: spacing(1),
      margin: `${spacing(2)}px 0`,
    },
    actions: {
      justifyContent: "flex-end",
    },
  });

type IProps = {
  history: any;
  open: boolean;
  question: any;
  handleClose: (open: boolean) => void;
};

/**
 * DeleteQuestion Component
 *
 * @param {History} history - the browser history object
 * @param {bool} open - whether the dialog should be open or not
 * @param {*} question - The question to be deleted
 * @param {*} handleClose - The function to run to close the dialog
 */
const DeleteQuestion = ({ history, open, question, handleClose }: IProps) => {
  const [questionError, setQuestionError] = React.useState("");

  const [deleteQuestion, { loading }] = useMutation(DELETE);

  /**
   * Check validation and then run the
   * question update network request
   *
   * On success,redirect to the home page
   */
  const submit = () => {
    const { id } = question;

    deleteQuestion({ variables: { id } })
      .then((res) => {
        if (res.data.deleteQuestion === true)
          return history.push(`/lesson/${question.lesson.id}/true`);
        setQuestionError("Could not delete Question");
      })
      .catch((err) => {
        setQuestionError(err.toString());
      });
  };
  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="edit-question-dialog"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleClose(false)}
            endIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Delete />}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={questionError !== ""}
        autoHideDuration={6000}
        onClose={() => setQuestionError("")}
        message={questionError}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(DeleteQuestion);
