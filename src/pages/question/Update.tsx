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
} from "@material-ui/core";

import { ArrowBack, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { READ, UPDATE } from "../../gql/question";
import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";

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
 * EditQuestion Component
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

  const { loading, error, data } = useQuery(READ, { variables: { id } });
  const [updateQuestion, { loading: mutationLoading }] = useMutation(UPDATE);

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

      updateQuestion({
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
          history.push(`/question/${res.data.updateQuestion.id}`);
        })
        .catch((e) => {
          console.log("error", e);
          setServerError(e.toString());
        });
    }
  };

  useEffect(() => {
    if (data && data.getQuestion) {
      setTitle(data.getQuestion.title);
      setLevel(data.getQuestion.level);
      setType(data.getQuestion.type);
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
        <CardHeader title="Edit Question" />

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
            label="Question Type"
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
