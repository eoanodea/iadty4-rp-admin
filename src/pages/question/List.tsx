import { createStyles, Fab, Theme, withStyles } from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import QuestionItem from "./../../components/question/QuestionItem";
import { Add } from "@material-ui/icons";
import { LIST } from "../../gql/question";

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

interface IProps extends RouteComponentProps {
  classes: {
    root: string;
    actions: string;
    fab: string;
  };
  match: any;
}

const List = ({ classes, match, history }: IProps) => {
  const { loading, error, data, refetch } = useQuery(LIST);

  let { newFetch } = match.params;

  if (newFetch) {
    refetch();
    history.push(`/questions`);
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
            history={history}
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
