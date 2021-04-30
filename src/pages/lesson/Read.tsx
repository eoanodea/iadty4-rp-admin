/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 9:52:05 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import LessonItem from "./../../components/lesson/LessonItem";
import { useQuery } from "@apollo/client";
import { READ } from "./../../gql/lesson";

//  import auth from "./../../helpers/auth-helper";

type IProps = {
  history: any;
  match: any;
};

/**
 * Article Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {Match} match - Contains information about a react-router-dom Route
 */
const Read = ({ history, match }: IProps) => {
  const { id } = match.params;

  // const { loading, error, data } = useQuery(GET_LESSON, { id: id });
  const { loading, error, data, refetch } = useQuery(READ, {
    variables: { id },
  });

  let { newFetch } = match.params;

  if (newFetch) {
    refetch();
    history.push(`/lesson/${id}`);
  }

  // const [displayActions, setDisplayActions] = React.useState(true);

  if (loading) return <Loading />;
  if (error || !data.getLesson)
    return (
      <EmptyState message={error ? error.message : "Could not load Lesson"} />
    );
  return (
    <React.Fragment>
      <Button
        component={Link}
        to={`/module/${data.getLesson.module.id}`}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <div style={{ position: "relative" }}>
        <LessonItem
          lesson={data.getLesson}
          history={history}
          displayActions={true}
          disableHeight={false}
        />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Read);
