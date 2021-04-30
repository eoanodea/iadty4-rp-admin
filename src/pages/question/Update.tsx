import React from "react";
import { Button, createStyles, withStyles } from "@material-ui/core";

import { ArrowBack } from "@material-ui/icons";

import { Link } from "react-router-dom";

import CreateQuestion from "./../../components/question/createQuestion";
import EmptyState from "./../../components/global/EmptyState";
import Loading from "./../../components/global/Loading";
import { useQuery } from "@apollo/client";
import { READ } from "./../../gql/question";

type IProps = {
  history: any;
  match: any;
  classes: any;
};

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: any) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });
/**
 * UpdateQuestion Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Update = ({ history, classes, match }: IProps) => {
  const { id } = match.params;
  const { loading, error, data } = useQuery(READ, { variables: { id } });

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error || !data.getQuestion)
    return (
      <EmptyState message={error ? error.message : "Could not load Question"} />
    );
  return (
    <React.Fragment>
      <Button
        component={Link}
        to={`/question/${match.params.id}`}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>

      <CreateQuestion
        history={history}
        match={match}
        update={data.getQuestion}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(Update);
