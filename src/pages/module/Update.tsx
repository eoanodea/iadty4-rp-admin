import React, { useEffect, useState } from "react";
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

import { useMutation, useQuery } from "@apollo/client";
import { READ, UPDATE } from "./../../gql/module";
import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import { RouteComponentProps } from "react-router-dom";

/**
 * Component types
 */
interface IProps extends RouteComponentProps {
  match: any;
  classes: any;
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
 * UpdateModule Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Update = ({ history, classes, match }: IProps) => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [type, setType] = useState("");

  const [titleError, setTitleError] = useState("");

  const [serverError, setServerError] = useState("");

  const { id } = match.params;

  /**
   * Fetch the current module and define
   * the Update Module mutation
   */
  const { loading, error, data } = useQuery(READ, { variables: { id } });
  const [updateModule, { loading: mutationLoading }] = useMutation(UPDATE);

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

      updateModule({
        variables: {
          id,
          input: {
            title,
            level,
            type,
          },
        },
      })
        .then((res: any) => {
          history.push(`/module/${res.data.updateModule.id}`);
        })
        .catch((e) => {
          console.log("error", e);
          setServerError(e.toString());
        });
    }
  };

  useEffect(() => {
    /**
     * If the module exists, set it in the state
     */
    if (data && data.getModule) {
      setTitle(data.getModule.title);
      setLevel(data.getModule.level);
      setType(data.getModule.type);
    }
  }, [data]);

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error) return <EmptyState message={error.message} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <Card elevation={3} className={classes.wrapper}>
        <CardHeader title="Edit Module" />

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
          />

          <TextField
            title="type"
            label="Lesson Type"
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
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
            disabled={loading || mutationLoading}
            endIcon={
              loading || mutationLoading ? (
                <CircularProgress size={18} />
              ) : (
                <Check />
              )
            }
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Update);
