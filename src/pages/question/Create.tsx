import React, { useState } from "react";
import { Button, createStyles, withStyles } from "@material-ui/core";

import { ArrowBack } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE } from "../../gql/question";
import CreateQuestion from "../../components/question/createQuestion";

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
 * CreateQuestion Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Create = ({ history, classes }: IProps) => {
  const [serverError, setServerError] = useState("");

  const [addQuestion, { loading }] = useMutation(CREATE);

  const handleValidation = () => {
    let isValid = false;
    // if (title.length < 3) {
    //   setTitleError("Title must be at least 3 characters");
    // } else {
    //   isValid = true;
    //   setTitleError("");
    // }

    return isValid;
  };

  const submit = () => {
    if (handleValidation()) {
      setServerError("");

      // addQuestion({
      //   variables: {
      //     input: {
      //       title,
      //       level,
      //       type,
      //     },
      //   },
      // })
      //   .then((res: any) => {
      //     // history.push(`/question/${res.data.addQuestion.id}`);
      //     history.push(`/questions/true`);
      //   })
      //   .catch((e) => {
      //     setServerError(e.toString());
      //   });
    }
  };

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>

      <CreateQuestion />
    </React.Fragment>
  );
};

export default withStyles(styles)(Create);
