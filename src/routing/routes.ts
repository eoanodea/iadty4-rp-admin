import {
  Create as CreateModule,
  Read as ReadModule,
  Update as UpdateModule,
  List as ListModule,
} from "./../pages/module";

import Notes from "../pages/Notes";

export type IRouteType = {
  name: string;
  link: string;
  component: any;
  authed: boolean;
};

const routes: IRouteType[] = [
  /**
   * Modules
   */
  {
    name: "Create Module",
    link: "/create/module",
    component: CreateModule,
    authed: false,
  },
  {
    name: "Module",
    link: "/module/:id",
    component: ReadModule,
    authed: false,
  },

  {
    name: "Update Module",
    link: "/update/module/:id",
    component: UpdateModule,
    authed: false,
  },
  {
    name: "Modules",
    link: "/modules/:newFetch?",
    component: ListModule,
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
