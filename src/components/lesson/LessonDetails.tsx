/**
 * File: LessonDetails.js
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
 * Renders a chip for the lesson
 *
 * @param {string} link - The link
 * @param {string} label - label to display on the chip
 * @param {Icon} icon - The icon to render
 */
const LessonChip = ({ link, label, icon }: IProps) => {
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

type ILessonDetailsProps = {
  classes: {
    chipContainer: any;
  };
  lesson: any;
  isLink: boolean;
};

/**
 * Details on the lesson component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} lesson - the lesson
 * @param {bool} isLink - whether it should be a link
 *
 */
const LessonDetails = ({ classes, lesson, isLink }: ILessonDetailsProps) => {
  return (
    <div className={classes.chipContainer}>
      <LessonChip
        icon={<AccountCircleOutlined />}
        label={lesson.user.name}
        link={isLink ? `/user/${lesson.user.id}` : null}
      />
      <LessonChip
        icon={<LocalOffer />}
        label={lesson.category.title}
        link={isLink ? `/category/${lesson.category.id}` : null}
      />
    </div>
  );
};

export default withStyles(styles)(LessonDetails);
