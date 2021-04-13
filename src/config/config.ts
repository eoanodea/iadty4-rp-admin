/**
 * File: config.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:49:31 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Sunday, 7th February 2021 2:10:01 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

type IConfig = {
  [key: string]: any;
  env: string;
  server_url: string;
};

export const config: IConfig = {
  env: process.env.NODE_ENV || "development",
  server_url:
    process.env.REACT_APP_SERVER_URL || "http://localhost:3000/graphql",
};
