/**
 * File: QuestionDetails.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 19th January 2021 1:09:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 7:09:12 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createStyles, withStyles, Chip, Theme } from "@material-ui/core";
import { AccountCircleOutlined, LocalOffer } from "@material-ui/icons";

import { Link } from "react-router-dom";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: Theme) =>
  createStyles({
    chipContainer: {
      "& > *": {
        margin: spacing(0.5),
      },
    },
  });

type IProps = {
  link: string | null;
  label: string;
  icon: any;
};

/**
 * Renders a chip for the question
 *
 * @param {string} link - The link
 * @param {string} label - label to display on the chip
 * @param {Icon} icon - The icon to render
 */
const QuestionChip = ({ link, label, icon }: IProps) => {
  if (link)
    return (
      <Chip
        icon={icon}
        label={label}
        color="primary"
        clickable
        component={Link}
        to={link}
      />
    );

  return <Chip icon={icon} label={label} color="primary" clickable />;
};

type IQuestionDetailsProps = {
  classes: {
    chipContainer: any;
  };
  question: any;
  isLink: boolean;
};

/**
 * Details on the question component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} question - the question
 * @param {bool} isLink - whether it should be a link
 *
 */
const QuestionDetails = ({
  classes,
  question,
  isLink,
}: IQuestionDetailsProps) => {
  return (
    <div className={classes.chipContainer}>
      <QuestionChip
        icon={<AccountCircleOutlined />}
        label={question.user.name}
        link={isLink ? `/user/${question.user.id}` : null}
      />
      <QuestionChip
        icon={<LocalOffer />}
        label={question.category.title}
        link={isLink ? `/category/${question.category.id}` : null}
      />
    </div>
  );
};

export default withStyles(styles)(QuestionDetails);
