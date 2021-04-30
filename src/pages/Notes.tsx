/*
 * File: Notes.tsx
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

import { createStyles, withStyles } from "@material-ui/core";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";

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

const GET_NOTES = gql`
  query getNotes {
    getNotes {
      id
      title
      markdown
      sanitizedHtml
    }
  }
`;

const Notes = () => {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (loading) return <Loading />;
  if (error) return <EmptyState message={error.message} />;

  console.log(data);

  return <React.Fragment></React.Fragment>;
};

export default withStyles(styles)(Notes);
