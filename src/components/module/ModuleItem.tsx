import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  createStyles,
  withStyles,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Theme,
  List,
  Fab,
  Typography,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Add, Create, Delete, MoreVert } from "@material-ui/icons";

import ModuleActionArea from "./ModuleActionArea";
import DeleteModule from "./DeleteModule";

import { Link } from "react-router-dom";
import LessonItem from "./../lesson/LessonItem";
import { useMutation } from "@apollo/client";
import { CREATE } from "./../../gql/lesson";
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
    fixedHeightCard: {
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

interface IProps extends IHistoryProps {
  displayActions: boolean;
  classes: {
    card: string;
    fixedHeightCard: string;
    avatar: string;
    chipContainer: string;
    divider: string;
    fab: string;
  };
  module: any;
  link?: string | null;
  delay?: number;
  disableHeight?: boolean;
  refetch?: () => void;
}

/**
 * ModuleItem Component
 *
 * A single comment
 *
 * @param {bool} displayActions - if the module belongs to the authed user, display actions
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} module - The module to be displayed
 * @param {*} link - The link to optionally display
 * @param {*} delay - The delay of the animation
 */
const ModuleItem = ({
  displayActions,
  history,
  classes,
  module,
  link = null,
  delay = 0,
  disableHeight = true,
  refetch = () => {},
}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [lessonMessage, setLessonMessage] = React.useState("");

  const [addLesson, { loading }] = useMutation(CREATE);

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

  const createLesson = () => {
    addLesson({
      variables: {
        module: module.id,
        input: {
          level: module.level,
        },
      },
    })
      .then(() => {
        refetch();
        setLessonMessage("Lesson Added");
      })
      .catch((err) => {
        console.log("error!", err);
        setLessonMessage("Error adding Lesson: " + err.toString());
      });
  };

  /**
   * Render JSX
   */
  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={disableHeight ? classes.fixedHeightCard : classes.card}>
        <ModuleActionArea link={link}>
          <CardHeader
            title={module.title}
            subheader={new Date(module.createdAt).toDateString()}
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
                      to={`/update/module/${module.id}`}
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
            {displayActions ? (
              <React.Fragment>
                <List>
                  {module.lessons.map(
                    (lesson: {
                      id: React.Key | null | undefined;
                      updatedAt: Date;
                    }) => {
                      return (
                        <LessonItem
                          history={history}
                          lesson={lesson}
                          key={lesson.id}
                          link={`/lesson/${lesson.id}`}
                          displayActions={false}
                        />
                      );
                    }
                  )}
                </List>
                <DeleteModule
                  open={openDeleteDialog}
                  module={module}
                  handleClose={setOpenDeleteDialog}
                  history={history}
                />
                <Fab
                  className={classes.fab}
                  // component={Link}
                  disabled={loading}
                  aria-label="Add Lesson"
                  color="secondary"
                  onClick={() => createLesson()}
                  // to="/create/lesson"
                >
                  {loading ? <CircularProgress size={18} /> : <Add />}
                </Fab>
                <Snackbar
                  open={lessonMessage !== ""}
                  autoHideDuration={6000}
                  onClose={() => setLessonMessage("")}
                  message={lessonMessage}
                ></Snackbar>
              </React.Fragment>
            ) : (
              <Typography variant="body2">
                {module.lessons.length} Lesson
                {module.lessons.length > 1 ? "s" : ""}
              </Typography>
            )}
          </CardContent>
        </ModuleActionArea>
      </Card>
    </Zoom>
  );
};

export default withStyles(styles)(ModuleItem);
