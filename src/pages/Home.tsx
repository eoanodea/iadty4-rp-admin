import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import auth from "./../helpers/auth-helper";

const styles = () =>
  createStyles({
    root: {
      maxWidth: "800px",
      margin: "0 auto",
      height: "500px",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    actions: {
      justifyContent: "center",
    },
  });

type IProps = {
  classes: {
    root: string;
    actions: string;
  };
};

const Home = ({ classes }: IProps) => {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h1">Welcome</Typography>
        <br />
        <Typography variant="body1">Music Theory Admin Dashboard</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {auth.isAuthenticated() ? (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            aria-label="Button"
            to="/modules"
          >
            Modules
          </Button>
        ) : (
          <React.Fragment>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              aria-label="Button"
              to="/login"
            >
              Login
            </Button>
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Home);
