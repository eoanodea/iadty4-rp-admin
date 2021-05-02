import React from "react";

import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import QuestionItem from "./../../components/question/QuestionItem";
import { useQuery } from "@apollo/client";
import { READ } from "./../../gql/question";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps {
  match: any;
}

/**
 * Read Question Component
 *
 * @param {Match} match - Contains information about a react-router-dom Route
 * @param {History} history - the browser history object
 */
const Read = ({ history, match }: IProps) => {
  const { id } = match.params;
  /**
   * Destructered variables from the graphql query
   */
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
        to={`/lesson/${data.getQuestion.lesson.id}`}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <div style={{ position: "relative" }}>
        <QuestionItem
          question={data.getQuestion}
          history={history}
          displayActions={true}
          disableHeight={false}
        />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Read);
