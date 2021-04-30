/**
 * File: QuestionItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 30th January 2021 2:32:04 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  createStyles,
  withStyles,
  ListItemIcon,
  ListItemText,
  Theme,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
  List,
  Fab,
  Typography,
} from "@material-ui/core";
import { Add, Create, Delete, MoreVert, Help } from "@material-ui/icons";
import { Link } from "react-router-dom";

import QuestionActionArea from "./QuestionActionArea";

import DeleteQuestion from "./DeleteQuestion";
import PreviewQuestion from "./PreviewQuestion";

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
    fixedHeightCard: {
      // height: 200,
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

type IProps = {
  displayActions: boolean;
  history?: History;
  classes: {
    card: string;
    fixedHeightCard: string;
    avatar: string;
    chipContainer: string;
    divider: string;
    fab: string;
  };
  question: any;
  link?: string | null;
  delay?: number;
  disableHeight?: boolean;
};

/**
 * QuestionItem Component
 *
 * A single comment
 *
 * @param {bool} displayActions - if the question belongs to the authed user, display actions
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} question - The question to be displayed
 * @param {*} link - The link to optionally display
 * @param {*} delay - The delay of the animation
 */
const QuestionItem = ({
  displayActions,
  history,
  classes,
  question,
  link = null,
  delay = 0,
  disableHeight = true,
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
                      to={`/update/question/${question.id}`}
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
              ? question.answerArr.map((item: string) => item)
              : question.answer
          }
        />
      </ListItem>
    </React.Fragment>
  );
};

export default withStyles(styles)(QuestionItem);
