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
import {
  AppBar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
} from "@material-ui/core";
import { AccountCircle, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { config } from "./../../config/config";

import ReactGA from "react-ga";
import auth from "./../../helpers/auth-helper";

type IProps = {
  isAuthed: boolean;
  setIsAuthed: (bool: boolean) => void;
  history: any;
};

/**
 * Header for the application
 */
const Header = ({ history, isAuthed, setIsAuthed }: IProps) => {
  ReactGA.initialize(config.ga_id);

  const [message, setMessage] = React.useState("");

  useEffect(() => {
    history.listen(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    });
  }, [history]);

  /**
   * Logout from the application
   */
  const submit = () => {
    const jwt = auth.isAuthenticated();
    if (jwt) {
      setLoading(true);

      auth.unsetUserDetails((success: any) => {
        if (success) {
          setIsAuthed(false);
          setLoading(false);
          handleClose();
          setMessage("Logged out successfully");

          return history.push("/");
        }
        setMessage("The system encountered an error, please try again later");
      });
    } else {
      setIsAuthed(false);
      setMessage("The system encountered an error, please try again later");
    }
  };

  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton aria-label="Home" component={Link} to="/">
            <Home />
          </IconButton>

          {isAuthed && (
            <React.Fragment>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem disabled={loading} onClick={submit}>
                  Logout {loading && <CircularProgress size={18} />}
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>

      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      ></Snackbar>
    </React.Fragment>
  );
};

export default Header;
