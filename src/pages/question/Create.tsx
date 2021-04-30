import React from "react";
import { Button, createStyles, withStyles } from "@material-ui/core";

import { ArrowBack } from "@material-ui/icons";

import { Link } from "react-router-dom";
import CreateQuestion from "./../../components/question/createQuestion";

type IProps = {
  history: any;
  match: any;
  classes: any;
};

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: any) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });
/**
 * CreateQuestion Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Create = ({ history, classes, match }: IProps) => {
  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Button
        component={Link}
        to={`/lesson/${match.params.lessonId}`}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>

      <CreateQuestion history={history} match={match} />
    </React.Fragment>
  );
};

export default withStyles(styles)(Create);
