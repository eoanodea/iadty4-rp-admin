import React, { useState } from "react";
import {
  Button,
  Card,
  TextField,
  CardHeader,
  CardContent,
  createStyles,
  withStyles,
  CardActions,
  CircularProgress,
  Typography,
  Theme,
} from "@material-ui/core";

import { ArrowBack, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE } from "./../../gql/lesson";
import { RouteComponentProps } from "react-router-dom";

/**
 * Component types
 */
interface IProps extends RouteComponentProps {
  match: any;
  classes: {
    wrapper: string;
  };
}

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

/**
 * CreateLesson Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Create = ({ history, classes }: IProps) => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [type, setType] = useState("");

  const [titleError, setTitleError] = useState("");

  const [serverError, setServerError] = useState("");

  /**
   * Define the add Lesson mutation
   */
  const [addLesson, { loading }] = useMutation(CREATE);

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let isValid = false;
    if (title.length < 3) {
      setTitleError("Title must be at least 3 characters");
    } else {
      isValid = true;
      setTitleError("");
    }

    return isValid;
  };

  /**
   * Validate the inputted info, and if it passes run the mutation
   */
  const submit = () => {
    if (handleValidation()) {
      setServerError("");

      addLesson({
        variables: {
          input: {
            title,
            level,
            type,
          },
        },
      })
        .then((res: any) => {
          history.push(`/lessons/true`);
        })
        .catch((e) => {
          setServerError(e.toString());
        });
    }
  };

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <Card elevation={3} className={classes.wrapper}>
        <CardHeader title="Create Lesson" />

        <CardContent>
          <TextField
            title="title"
            label="Title"
            autoFocus={true}
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={titleError !== ""}
            helperText={titleError}
          />

          <TextField
            title="level"
            label="Level"
            margin="normal"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
                max: 12,
              },
            }}
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            // error={levelError !== ""}
            // helperText={levelError}
          />

          <TextField
            title="type"
            label="Lesson Type"
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            // error={typeError !== ""}
            // helperText={typeError}
          />

          <Typography variant="caption" color="error">
            {serverError}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Check />}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Create);
