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

import { Link, RouteComponentProps } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REGISTER } from "./../../gql/auth";

interface IProps extends RouteComponentProps {
  match: any;
  classes: any;
}

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
 * RegisterModule Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Register = ({ history, classes }: IProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [register] = useMutation(REGISTER);

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      passed = false;
    }

    if (email.length < 3) {
      setEmailError("Email must be at least 3 characters");
      passed = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email");
      passed = false;
    } else setEmailError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      passed = false;
    } else setPasswordError("");

    return passed;
  };

  const submit = () => {
    if (handleValidation()) {
      setError("");
      setLoading(true);
      register({
        variables: {
          name,
          email,
          password,
        },
      })
        .then((res: any) => {
          setError("");

          return history.push(`/login`);
        })
        .catch((e: any) => {
          setLoading(false);

          setError(e.toString());
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
        <CardHeader title="Register" />

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
            name="email"
            label="Email"
            autoFocus={true}
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={emailError !== ""}
            helperText={emailError}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={passwordError !== ""}
            helperText={passwordError}
          />

          <br />

          <Typography variant="caption" color="error">
            {error}
          </Typography>

          <Typography variant="caption">
            Already have an account? <Link to="/login">Login here</Link>
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
            Sign up
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Register);
