/*
 * File: Questions.tsx
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
import { useQuery, gql } from "@apollo/client";
import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import QuestionItem from "./../../components/question/QuestionItem";
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
  match: any;
  history: any;
};

const GET_QUESTIONS = gql`
  query getQuestions {
    getQuestions {
      id
      title
      level
      createdAt
      updatedAt
      questions {
        id
        createdAt
        updatedAt
      }
    }
  }
`;

const List = ({ classes, match, history }: IProps) => {
  const { loading, error, data, refetch } = useQuery(GET_QUESTIONS);

  let { newFetch } = match.params;

  if (newFetch) {
    refetch();
    history.push(`/questions`);

    // newFetch = false;
  }

  if (loading) return <Loading />;
  if (error) return <EmptyState message={error.message} />;

  return (
    <React.Fragment>
      {data.getQuestions.length < 1 ? (
        <EmptyState message="No Questions Found" />
      ) : (
        data.getQuestions.map((question: { id: any }) => (
          <QuestionItem
            key={question.id}
            displayActions={false}
            question={question}
            link={`/question/${question.id}`}
          />
        ))
      )}
      <Fab
        className={classes.fab}
        component={Link}
        aria-label="Add Question"
        color="secondary"
        to="/create/question"
      >
        <Add />
      </Fab>
    </React.Fragment>
  );
};

export default withStyles(styles)(List);