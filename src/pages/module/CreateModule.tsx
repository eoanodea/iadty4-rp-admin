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

// interface Module {
//   title: String;
//   type: String;
//   level: number;
// }

// const typeDefs = gql`
//   extend type Module {
//     title: String!
//     type: String!
//     level: Float!
//   }

//   extend type ModuleValidator {
//     title: String!
//     level: Float!
//     type: String!
//   }
// `;

const ADD_MODULE = gql`
  mutation AddModule($input: ModuleValidator!) {
    addModule(input: $input) {
      id
    }
  }
`;

/**
 * CreateModule Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const CreateModule = ({ history, classes }: IProps) => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [type, setType] = useState("");

  const [titleError, setTitleError] = useState("");
  // const [levelError, setLevelError] = useState("");
  // const [typeError, setTypeError] = useState("");

  const [serverError, setServerError] = useState("");

  const [addModule, { loading }] = useMutation(ADD_MODULE);

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
          console.log("result!", res);
          history.push(`/module/${res.data.addModule.id}`);
        })
        .catch((e) => {
          console.log("error", e);
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
            autoFocus={true}
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
            autoFocus={true}
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

export default withStyles(styles)(CreateModule);
