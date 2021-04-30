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
} from "@material-ui/core";

import { ArrowBack, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE } from "./../../gql/module";

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
 * CreateModule Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Create = ({ history, classes }: IProps) => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [type, setType] = useState("THEORY");

  const [titleError, setTitleError] = useState("");

  const [serverError, setServerError] = useState("");

  const [addModule, { loading }] = useMutation(CREATE);

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

  const submit = () => {
    if (handleValidation()) {
      setServerError("");

      addModule({
        variables: {
          input: {
            title,
            level,
            type,
          },
        },
      })
        .then((res: any) => {
          history.push(`/modules/true`);
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
        <CardHeader title="Create Module" />

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
