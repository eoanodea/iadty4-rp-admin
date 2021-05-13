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
import { LOGIN } from "./../../gql/auth";
import auth from "./../../helpers/auth-helper";
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
const styles = ({ spacing }: any) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

/**
 * LoginModule Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Login = ({ history, classes }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [login] = useMutation(LOGIN);

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

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

  /**
   * Validate the inputted info, and if it passes run the login mutation
   */
  const submit = () => {
    if (handleValidation()) {
      setError("");
      setLoading(true);
      login({
        variables: {
          email,
          password,
        },
      })
        .then((res: any) => {
          setError("");
          auth.setUserDetails(res.data.adminLogin, (success) => {
            if (success) {
              return history.push("/modules");
            }
            setError("The system encountered an error, please try again later");
          });
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
        <CardHeader title="Login" />

        <CardContent>
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
            Don't have an account? <Link to="/register">Register here</Link>
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
            Login
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Login);
