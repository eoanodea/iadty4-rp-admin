import React from "react";

import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import LessonItem from "./../../components/lesson/LessonItem";
import { useQuery } from "@apollo/client";
import { READ } from "./../../gql/lesson";
import { RouteComponentProps } from "react-router-dom";

/**
 * Component Types
 */
interface IProps extends RouteComponentProps {
  match: any;
}

/**
 * ReadLesson Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {Match} match - Contains information about a react-router-dom Route
 */
const Read = ({ history, match }: IProps) => {
  const { id, newFetch } = match.params;

  /**
   * Destructered variables from the graphql query
   */
  const { loading, error, data, refetch } = useQuery(READ, {
    variables: { id },
  });

  /**
   * GraphQL often caches queries, but after running some
   * create or update functions a manual refetch is required
   *
   * We pass this in the URL bar as an optional refetch boolean
   * If it exists, we run the refetch function and redirect to the same page
   */
  if (newFetch) {
    refetch();
    history.push(`/lesson/${id}`);
  }

  /**
   * Render JSX
   */
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
