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

/**
 * Component Types
 */
type IProps = {
  link: string | null;
  label: string;
  icon: JSX.Element;
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

/**
 * Component Types
 */
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
