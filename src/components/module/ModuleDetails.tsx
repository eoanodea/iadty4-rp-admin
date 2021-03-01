/**
 * File: ModuleDetails.js
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
 * Renders a chip for the module
 *
 * @param {string} link - The link
 * @param {string} label - label to display on the chip
 * @param {Icon} icon - The icon to render
 */
const ModuleChip = ({ link, label, icon }: IProps) => {
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

type IModuleDetailsProps = {
  classes: {
    chipContainer: any;
  };
  module: any;
  isLink: boolean;
};

/**
 * Details on the module component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} module - the module
 * @param {bool} isLink - whether it should be a link
 *
 */
const ModuleDetails = ({ classes, module, isLink }: IModuleDetailsProps) => {
  return (
    <div className={classes.chipContainer}>
      <ModuleChip
        icon={<AccountCircleOutlined />}
        label={module.user.name}
        link={isLink ? `/user/${module.user.id}` : null}
      />
      <ModuleChip
        icon={<LocalOffer />}
        label={module.category.title}
        link={isLink ? `/category/${module.category.id}` : null}
      />
    </div>
  );
};

export default withStyles(styles)(ModuleDetails);
