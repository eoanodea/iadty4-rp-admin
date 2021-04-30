import {
  Create as CreateModule,
  Read as ReadModule,
  Update as UpdateModule,
  List as ListModule,
} from "./../pages/module";

import {
  Create as CreateLesson,
  Read as ReadLesson,
  Update as UpdateLesson,
  List as ListLesson,
} from "./../pages/lesson";

import {
  Create as CreateQuestion,
  Read as ReadQuestion,
  Update as UpdateQuestion,
  List as ListQuestion,
} from "./../pages/question";

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
    link: "/module/:id/:newFetch?",
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
  /**
   * Lessons
   */
  {
    name: "Create Lesson",
    link: "/create/lesson",
    component: CreateLesson,
    authed: false,
  },
  {
    name: "Lesson",
    link: "/lesson/:id/:newFetch?",
    component: ReadLesson,
    authed: false,
  },

  {
    name: "Update Lesson",
    link: "/update/lesson/:id",
    component: UpdateLesson,
    authed: false,
  },
  {
    name: "Lessons",
    link: "/lessons/:newFetch?",
    component: ListLesson,
    authed: false,
  },
  /**
   * Questions
   */
  {
    name: "Create Question",
    link: "/create/question/:id",
    component: CreateQuestion,
    authed: false,
  },
  {
    name: "Question",
    link: "/question/:id",
    component: ReadQuestion,
    authed: false,
  },

  {
    name: "Update Question",
    link: "/update/question/:lessonId/:id",
    component: UpdateQuestion,
    authed: false,
  },
  {
    name: "Questions",
    link: "/questions/:newFetch?",
    component: ListQuestion,
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
