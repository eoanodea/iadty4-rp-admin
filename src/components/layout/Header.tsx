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
import { IHistoryProps } from "../../types/router";

/**
 * Component Types
 */
interface IProps extends IHistoryProps {
  isAuthed: boolean;
  setIsAuthed: (bool: boolean) => void;
}

/**
 * Header for the application
 */
const Header = ({ history, isAuthed, setIsAuthed }: IProps) => {
  /**
   * Initialize Google Analytics
   */
  ReactGA.initialize(config.ga_id);

  const [message, setMessage] = React.useState("");

  useEffect(() => {
    /**
     * Listen for changes in the router and send page views to Google Analytics
     */
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

      auth.unsetUserDetails((success: boolean) => {
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
