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

import Login from "./../pages/auth/Login";

export type IRouteType = {
  name: string;
  link: string;
  component: any;
  authed: boolean;
};

const routes: IRouteType[] = [
  /**
   * Auth
   */
  {
    name: "Login",
    link: "/login",
    component: Login,
    authed: false,
  },

  /**
   * Modules
   */
  {
    name: "Create Module",
    link: "/create/module",
    component: CreateModule,
    authed: true,
  },
  {
    name: "Module",
    link: "/module/:id/:newFetch?",
    component: ReadModule,
    authed: true,
  },

  {
    name: "Update Module",
    link: "/update/module/:id",
    component: UpdateModule,
    authed: true,
  },
  {
    name: "Modules",
    link: "/modules/:newFetch?",
    component: ListModule,
    authed: true,
  },
  /**
   * Lessons
   */
  {
    name: "Create Lesson",
    link: "/create/lesson",
    component: CreateLesson,
    authed: true,
  },
  {
    name: "Lesson",
    link: "/lesson/:id/:newFetch?",
    component: ReadLesson,
    authed: true,
  },

  {
    name: "Update Lesson",
    link: "/update/lesson/:id",
    component: UpdateLesson,
    authed: true,
  },
  {
    name: "Lessons",
    link: "/lessons/:newFetch?",
    component: ListLesson,
    authed: true,
  },
  /**
   * Questions
   */
  {
    name: "Create Question",
    link: "/create/question/:id",
    component: CreateQuestion,
    authed: true,
  },
  {
    name: "Question",
    link: "/question/:id",
    component: ReadQuestion,
    authed: true,
  },

  {
    name: "Update Question",
    link: "/update/question/:lessonId/:id",
    component: UpdateQuestion,
    authed: true,
  },
  {
    name: "Questions",
    link: "/questions/:newFetch?",
    component: ListQuestion,
    authed: true,
  },
];

export default routes;
