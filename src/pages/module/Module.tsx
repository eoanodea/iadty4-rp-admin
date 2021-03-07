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

//  import { show } from "../../api/api-article";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ModuleItem from "../../components/module/ModuleItem";
import { gql, useQuery } from "@apollo/client";

//  import auth from "../../helpers/auth-helper";

type IProps = {
  history: any;
};

const GET_MODULE = gql`
  query getModules {
    getModule(id: "603cd8ccfd47707c7a689696") {
      id
      title
      level
      createdAt
      updatedAt
      lessons {
        id
      }
    }
  }
`;

/**
 * Article Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {Match} match - Contains information about a react-router-dom Route
 */
const Article = ({ history }: IProps) => {
  const { loading, error, data } = useQuery(GET_MODULE);

  const [displayActions, setDisplayActions] = React.useState(true);

  if (loading) return <Loading />;
  if (error) return <EmptyState message={error.message} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <div style={{ position: "relative" }}>
        <ModuleItem
          module={data.getModule}
          history={history}
          displayActions={displayActions}
          disableHeight={false}
        />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Article);
