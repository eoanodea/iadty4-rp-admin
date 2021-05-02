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
import { DELETE } from "./../../gql/module";
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

interface IProps extends IHistoryProps {
  open: boolean;
  module: any;
  handleClose: (open: boolean) => void;
}

/**
 * DeleteModule Component
 *
 * @param {History} history - the browser history object
 * @param {bool} open - whether the dialog should be open or not
 * @param {*} module - The module to be deleted
 * @param {*} handleClose - The function to run to close the dialog
 */
const DeleteModule = ({ history, open, module, handleClose }: IProps) => {
  const [moduleError, setModuleError] = React.useState("");

  const [deleteModule, { loading }] = useMutation(DELETE);

  /**
   * Check validation and then run the
   * module update network request
   *
   * On success,redirect to the home page
   */
  const submit = () => {
    const { id } = module;

    deleteModule({ variables: { id } })
      .then((res) => {
        if (res.data.deleteModule === true)
          return history.push("/modules/true");
        setModuleError("Could not delete Module");
      })
      .catch((err) => {
        setModuleError(err.toString());
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
        aria-labelledby="edit-module-dialog"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this module?
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
        open={moduleError !== ""}
        autoHideDuration={6000}
        onClose={() => setModuleError("")}
        message={moduleError}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(DeleteModule);
