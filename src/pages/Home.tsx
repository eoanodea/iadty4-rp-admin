/*
 * File: Home.tsx
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Tuesday, 26th January 2021 1:09:55 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Sunday, 7th February 2021 5:50:20 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

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
    root: any;
    actions: string;
  };
};

const Home = ({ classes }: IProps) => {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h1">Welcome</Typography>
        <br />
        <Typography variant="body1">ReactJS Boilerplate</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          aria-label="Button"
          to="/modules"
        >
          Modules
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Home);
