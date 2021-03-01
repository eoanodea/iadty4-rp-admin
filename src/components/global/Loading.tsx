/*
 * File: Loading.tsx
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Tuesday, 26th January 2021 1:06:24 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 1:51:58 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import { CircularProgress, withStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    progressWrapper: {
      minHeight: "-webkit-fill-available",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

type IProps = {
  classes: {
    progressWrapper: string;
  };
};

/**
 * Renders an Activity Indicator
 *  for the application
 */
const Loading = ({ classes }: IProps) => (
  <div className={classes.progressWrapper}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loading);
