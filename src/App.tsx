/*
 * File: App.tsx
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Tuesday, 26th January 2021 12:55:39 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: 
 * Last Modified: Sunday, 7th February 2021 2:10:51 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */






import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import MainRouter from "./routing/MainRouter";
import theme from "./theme";

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </Router>
);

export default App;
