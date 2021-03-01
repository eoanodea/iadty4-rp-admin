/*
 * File: Header.tsx
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Sunday, 7th February 2021 11:59:39 am
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Sunday, 7th February 2021 5:55:45 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React, { useEffect } from "react";

/**
 * Component Library imports
 */
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { GitHub, Home, Mail } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import { config } from "../../config/config";

import ReactGA from "react-ga";

/**
 * Header for the application
 */
const Header = ({ history }: any) => {
  ReactGA.initialize(config.ga_id);

  useEffect(() => {
    history.listen(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    });
  }, [history]);

  return (
    <AppBar position="sticky">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton aria-label="Home" component={Link} to="/">
          <Home />
        </IconButton>

        <div>
          <IconButton
            aria-label="View Code on Github"
            href="https://github.com/eoanodea/eoanie-cv-viewer"
            rel="noreferrer"
            target="_blank"
          >
            <GitHub />
          </IconButton>
          <IconButton aria-label="Contact" component={Link} to="/contact">
            <Mail />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
