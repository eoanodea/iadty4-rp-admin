/**
 * File: ModuleItem.js
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
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  createStyles,
  withStyles,
  Divider,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@material-ui/core";
import { Create, Delete, MoreVert } from "@material-ui/icons";

import ModuleActionArea from "./ModuleActionArea";
import ModuleDetails from "./ModuleDetails";
import DeleteModule from "./DeleteModule";

import { Link } from "react-router-dom";

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
      height: 200,
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
  };
  module: any;
  link?: string | null;
  delay?: number;
  disableHeight?: boolean;
};

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
  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={disableHeight ? classes.fixedHeightCard : classes.card}>
        <ModuleActionArea link={link}>
          <CardHeader
            avatar={
              <Avatar color="secondary" className={classes.avatar}>
                {module.user.name[0]}
                {module.user.name.split(" ").length > 1 &&
                  module.user.name.split(" ")[1][0]}
              </Avatar>
            }
            title={module.title}
            subheader={new Date(module.created_at).toDateString()}
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
                      to={`/modules/edit/${module.id}`}
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
            <React.Fragment>
              <div className={classes.chipContainer}>
                <ModuleDetails module={module} isLink={link === null} />
              </div>
            </React.Fragment>

            {!link && (
              <React.Fragment>
                <Divider className={classes.divider} />
                <Typography variant="body2" color="textSecondary" component="p">
                  {/* {module.body} */}
                </Typography>
              </React.Fragment>
            )}
          </CardContent>
        </ModuleActionArea>
        <DeleteModule
          open={openDeleteDialog}
          module={module}
          handleClose={setOpenDeleteDialog}
          history={history}
        />
      </Card>
    </Zoom>
  );
};

export default withStyles(styles)(ModuleItem);
