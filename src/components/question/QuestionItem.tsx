import React from "react";

import {
  createStyles,
  withStyles,
  ListItemIcon,
  ListItemText,
  Theme,
  ListItem,
  CardHeader,
  CardContent,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Create, Delete, MoreVert, Help } from "@material-ui/icons";
import { Link } from "react-router-dom";

import QuestionActionArea from "./QuestionActionArea";

import DeleteQuestion from "./DeleteQuestion";
import PreviewQuestion from "./PreviewQuestion";
import { IHistoryProps } from "../../types/router";

/**
 * Injected styles
 *
 * @param {int} spacing
 * @param {palette} palette - The palette defined in theme.js
 */
const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },

    avatar: {
      background: palette.secondary.main,
    },
    chipContainer: {
      "& > *": {
        margin: spacing(0.5),
      },
    },
    divider: {
      margin: spacing(2),
    },
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),
    },
  });

/**
 * Component Types
 */
interface IProps extends IHistoryProps {
  displayActions: boolean;
  question: any;
  lessonId?: string | null;
  link?: string | null;
  delay?: number;
  disableHeight?: boolean;
}

/**
 * QuestionItem Component
 *
 * A single comment
 *
 * @param {bool} displayActions - if the question belongs to the authed user, display actions
 * @param {History} history - the browser history object
 * @param {*} question - The question to be displayed
 * @param {*} link - The link to optionally display
 * @param {*} delay - The delay of the animation
 */
const QuestionItem = ({
  displayActions,
  history,

  question,
  link = null,
  delay = 0,
  lessonId = null,
}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  /**
   * Opens the more options menu
   *
   * @param {*} event
   */
  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  /**
   * Closes the more options menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Render JSX
   */
  if (displayActions)
    return (
      <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
        <QuestionActionArea link={link}>
          <CardHeader
            title={question.text.map((item: any) => item.text + " ")}
            subheader={
              question.type === "MULTIPLE_CHOICE"
                ? "Answer: " + question.answerArr.map((item: string) => item)
                : "Answer: " + question.answer
            }
            action={
              displayActions && (
                <React.Fragment>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleOpen}
                  >
                    <MoreVert />
                  </IconButton>

                  <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to={`/update/question/${
                        lessonId ? lessonId : question.lesson.id
                      }/${question.id}`}
                    >
                      <ListItemIcon>
                        <Create />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </MenuItem>
                    <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                      <ListItemIcon>
                        <Delete />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )
            }
          />
          <CardContent>
            <PreviewQuestion question={question} />
            <DeleteQuestion
              open={openDeleteDialog}
              question={question}
              handleClose={setOpenDeleteDialog}
              history={history}
            />
          </CardContent>
        </QuestionActionArea>
      </Zoom>
    );

  return (
    <React.Fragment>
      <ListItem button={true} component={Link} to={`/question/${question.id}`}>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText
          primary={question.text.map((item: any) => item.text + " ")}
          secondary={
            question.type === "MULTIPLE_CHOICE"
              ? "Answer: " + question.answerArr.map((item: string) => item)
              : "Answer: " + question.answer
          }
        />
      </ListItem>
    </React.Fragment>
  );
};

export default withStyles(styles)(QuestionItem);
