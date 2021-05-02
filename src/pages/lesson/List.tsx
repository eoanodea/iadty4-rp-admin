import { createStyles, Fab, Theme, withStyles } from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import LessonItem from "./../../components/lesson/LessonItem";
import { Add } from "@material-ui/icons";
import { LIST } from "./../../gql/lesson";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
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

/**
 * Component types
 */
interface IProps extends RouteComponentProps {
  classes: {
    root: string;
    actions: string;
    fab: string;
  };
  match: any;
}

/**
 * ListLesson Component
 *
 * @param {Theme} classes - Injected css styles
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const List = ({ classes, match, history }: IProps) => {
  /**
   * Destructered variables from the graphql query
   */
  const { loading, error, data, refetch } = useQuery(LIST);

  /**
   * GraphQL often caches queries, but after running some
   * create or update functions a manual refetch is required
   *
   * We pass this in the URL bar as an optional refetch boolean
   */
  let { newFetch } = match.params;
  /**
   * If it exists, we run the refetch function and redirect to the same page
   */
  if (newFetch) {
    refetch();
    history.push(`/lessons`);
  }

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error) return <EmptyState message={error.message} />;
  return (
    <React.Fragment>
      {data.getLessons.length < 1 ? (
        <EmptyState message="No Lessons Found" />
      ) : (
        data.getLessons.map((lesson: { id: any }) => (
          <LessonItem
            history={history}
            key={lesson.id}
            displayActions={false}
            lesson={lesson}
            link={`/lesson/${lesson.id}`}
          />
        ))
      )}
      <Fab
        className={classes.fab}
        component={Link}
        aria-label="Add Lesson"
        color="secondary"
        to="/create/lesson"
      >
        <Add />
      </Fab>
    </React.Fragment>
  );
};

export default withStyles(styles)(List);
