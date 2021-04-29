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

import { gql, useMutation } from "@apollo/client";
import { CREATE } from "../../gql/lesson";

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

// interface Lesson {
//   title: String;
//   type: String;
//   level: number;
// }

// const typeDefs = gql`
//   extend type Lesson {
//     title: String!
//     type: String!
//     level: Float!
//   }

//   extend type LessonValidator {
//     title: String!
//     level: Float!
//     type: String!
//   }
// `;

// const ADD_LESSON = gql`
//   mutation AddLesson($input: LessonValidator!) {
//     addLesson(input: $input) {
//       __typename
//       id
//       title
//       level
//       type
//     }
//   }
// `;

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

  const [addLesson, { loading }] = useMutation(CREATE, {
    update(cache, { data: { addLesson } }) {
      cache.modify({
        fields: {
          lessons(existingLessons = []) {
            const newLessonRef = cache.writeFragment({
              data: addLesson,
              fragment: gql`
                fragment NewLesson on Lesson {
                  __typename
                  id
                  title
                  level
                  type
                }
              `,
            });
            return [...existingLessons, newLessonRef];
          },
        },
      });
    },
  });

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
          // history.push(`/lesson/${res.data.addLesson.id}`);
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
