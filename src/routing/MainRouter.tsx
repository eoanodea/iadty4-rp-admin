import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Home from "./../pages/Home";
import Header from "./../components/layout/Header";
import EmptyState from "./../components/global/EmptyState";

import routes, { IRouteType } from "./routes";
import auth from "./../helpers/auth-helper";

const MainRouter = () => {
  /**
   * If set to true, displays routes that only authenticated users should see
   * If not, displays login / register
   */
  const [isAuthed, setIsAuthed] = React.useState(false);
  const history = useHistory();
  /**
   * Check if the user is authenticaed
   */
  useEffect(() => {
    const setAuth = (bool: boolean) => setIsAuthed(bool);

    const jwt = auth.isAuthenticated();
    setAuth(jwt ? true : false);

    /**
     * Listen for changes in the URL bar,
     * and check if the user is authenticated
     *
     * Can only be done when the component
     * is exported through withRouter
     */
    history.listen(() => {
      const jwt = auth.isAuthenticated();
      setAuth(jwt ? true : false);
    });
  }, [history]);

  return (
    <React.Fragment>
      <Header isAuthed={isAuthed} setIsAuthed={setIsAuthed} history={history} />
      <Grid
        container
        justify="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Switch>
            <Route exact path="/" component={Home} />

            {routes.map(({ link, component, authed }: IRouteType, i) => {
              if (authed && !isAuthed)
                return (
                  <Route
                    key={i}
                    render={() => (
                      <EmptyState
                        message="You need to be logged in to view this page"
                        action={() => history.push("/login")}
                        actionLabel={"Login"}
                      />
                    )}
                  />
                );

              return <Route path={link} component={component} key={i} />;
            })}

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
