/**
 * File: reportWebVitals.ts
 * Project: cv-viewer
 * Version 0.1.0
 * File Created: Tuesday, 26th January 2021 12:55:39 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: 
 * Last Modified: Tuesday, 26th January 2021 1:53:31 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */


import { ReportHandler } from "web-vitals";

const reportWebVitals = (onPerfEntry: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
