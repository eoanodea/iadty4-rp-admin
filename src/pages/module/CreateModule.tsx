import React, { useState, useEffect, useCallback } from "react";
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
} from "@material-ui/core";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { ArrowBack, Check } from "@material-ui/icons";

import { Link } from "react-router-dom";

// import { create } from "../../api/api-module";
// import { list } from "../../api/api-categories";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";

// import auth from "../../helpers/auth-helper";
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

interface Module {
  title: String;
  type: String;
  level: number;
}

const typeDefs = gql`
  extend type Module {
    title: String!
    type: String!
    level: Float!
  }

  extend type ModuleValidator {
    title: String!
    level: Float!
    type: String!
  }
`;

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
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");

  const [nameError, setNameError] = useState("");
  const [levelError, setLevelError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [addModule, { data }] = useMutation(ADD_MODULE);

  const submit = () => {};

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
            name="name"
            label="Name"
            autoFocus={true}
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={nameError !== ""}
            helperText={nameError}
          />

          <TextField
            name="level"
            label="Level"
            autoFocus={true}
            margin="normal"
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={levelError !== ""}
            helperText={levelError}
          />

          <TextField
            name="type"
            label="Lesson Type"
            autoFocus={true}
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={typeError !== ""}
            helperText={typeError}
          />
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            // disabled={loading}
            // endIcon={loading ? <CircularProgress size={18} /> : <Check />}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(CreateModule);
