/*
 * File: Modules.tsx
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

import { createStyles, Fab, Theme, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ModuleItem from "../../components/module/ModuleItem";
import { Add } from "@material-ui/icons";

const styles = ({ spacing }: Theme) =>
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
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),
    },
  });

type IProps = {
  classes: {
    root: any;
    actions: string;
    fab: string;
  };
};

const GET_MODULES = gql`
  query getModules {
    getModules {
      id
      title
      level
      createdAt
      updatedAt
      lessons {
        id
        createdAt
        updatedAt
      }
    }
  }
`;

const Modules = ({ classes }: IProps) => {
  const { loading, error, data } = useQuery(GET_MODULES);

  if (loading) return <Loading />;
  if (error) return <EmptyState message={error.message} />;

  return (
    <React.Fragment>
      {data.getModules.length < 1 ? (
        <EmptyState message="No Modules Found" />
      ) : (
        data.getModules.map((module: { id: any }) => (
          <ModuleItem
            displayActions={false}
            module={module}
            link={`/module/${module.id}`}
          />
        ))
      )}
      <Fab
        className={classes.fab}
        component={Link}
        aria-label="Add Module"
        color="secondary"
        to="/create/module"
      >
        <Add />
      </Fab>
    </React.Fragment>
  );
};

export default withStyles(styles)(Modules);
