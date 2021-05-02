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
import { DELETE } from "./../../gql/lesson";
import { useMutation } from "@apollo/client";
import { IHistoryProps } from "../../types/router";

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

/**
 * Component Types
 */
interface IProps extends IHistoryProps {
  open: boolean;
  lesson: any;
  handleClose: (open: boolean) => void;
}

/**
 * DeleteLesson Component
 *
 * @param {History} history - the browser history object
 * @param {bool} open - whether the dialog should be open or not
 * @param {*} lesson - The lesson to be deleted
 * @param {*} handleClose - The function to run to close the dialog
 */
const DeleteLesson = ({ history, open, lesson, handleClose }: IProps) => {
  const [lessonError, setLessonError] = React.useState("");

  const [deleteLesson, { loading }] = useMutation(DELETE);

  /**
   * Check validation and then run the
   * lesson update network request
   *
   * On success,redirect to the home page
   */
  const submit = () => {
    const { id } = lesson;

    deleteLesson({ variables: { id } })
      .then((res) => {
        if (res.data.deleteLesson === true)
          return history.push(`/module/${lesson.module.id}/true`);
        setLessonError("Could not delete Lesson");
      })
      .catch((err) => {
        setLessonError(err.toString());
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
        aria-labelledby="edit-lesson-dialog"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this lesson?
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
        open={lessonError !== ""}
        autoHideDuration={6000}
        onClose={() => setLessonError("")}
        message={lessonError}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(DeleteLesson);
