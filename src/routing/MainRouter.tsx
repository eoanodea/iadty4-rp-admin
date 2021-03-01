/*
 * File: MainRouter.tsx
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Tuesday, 26th January 2021 1:05:02 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Sunday, 7th February 2021 5:37:20 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Home from "../pages/Home";
import Header from "../components/layout/Header";
import EmptyState from "../components/global/EmptyState";

import routes, { IRouteType } from "./routes";

const MainRouter = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        justify="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Switch>
            <Route exact path="/" component={Home} />

            {routes.map(({ link, component }: IRouteType, i) => (
              <Route path={link} component={component} key={i} />
            ))}

            <Route
              render={() => (
                <EmptyState message="The page you are looking for does not exist" />
              )}
            />
          </Switch>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainRouter;
