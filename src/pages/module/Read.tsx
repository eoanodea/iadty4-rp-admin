import React from "react";

import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import Loading from "./../../components/global/Loading";
import EmptyState from "./../../components/global/EmptyState";
import ModuleItem from "./../../components/module/ModuleItem";
import { useQuery } from "@apollo/client";
import { READ } from "./../../gql/module";

import { RouteComponentProps } from "react-router-dom";

/**
 * Component Types
 */
interface IProps extends RouteComponentProps {
  match: any;
}

/**
 * ReadModule Component
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
   * Render JSX if it is loading or no module exists
   */
  if (loading) return <Loading />;
  if (error || !data.getModule)
    return (
      <EmptyState message={error ? error.message : "Could not load Module"} />
    );

  /**
   * GraphQL often caches queries, but after running some
   * create or update functions a manual refetch is required
   *
   * We pass this in the URL bar as an optional refetch boolean
   * If it exists, we run the refetch function and redirect to the same page
   */
  if (newFetch) {
    refetch();
    history.push(`/module/${data.getModule.id}`);
  }

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Button component={Link} to="/modules" startIcon={<ArrowBack />}>
        Back
      </Button>
      <div style={{ position: "relative" }}>
        <ModuleItem
          module={data.getModule}
          history={history}
          displayActions={true}
          disableHeight={false}
          refetch={refetch}
        />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Read);
