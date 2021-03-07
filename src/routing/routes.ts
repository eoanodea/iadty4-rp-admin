/**
 * File: routes.js
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Tuesday, 26th January 2021 1:05:02 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 1:52:33 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import Module from "../pages/module/Module";
import Modules from "../pages/module/Modules";
import Notes from "../pages/Notes";

export type IRouteType = {
  name: string;
  link: string;
  component: any;
  authed: boolean;
};

const routes: IRouteType[] = [
  {
    name: "Modules",
    link: "/modules",
    component: Modules,
    authed: false,
  },
  {
    name: "Modules",
    link: "/module/:id",
    component: Module,
    authed: false,
  },
  {
    name: "Notes",
    link: "/notes",
    component: Notes,
    authed: false,
  },
];

export default routes;
