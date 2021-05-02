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
 * Article Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {Match} match - Contains information about a react-router-dom Route
 */
const Read = ({ history, match }: IProps) => {
  const { id } = match.params;

  const { loading, error, data } = useQuery(READ, { variables: { id } });

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
