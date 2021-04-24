/**
 * File: QuestionActionArea.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:11:07 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Question action area
 * Last Modified: Tuesday, 26th January 2021 7:10:45 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";

type IProps = {
  link: string | null;
  children: any;
};

/**
 * Conditionally displays an action area to be
 * clicked if there is a link present
 *
 * This component was created because an <a> tag
 * cannot be nested within another <a> tag
 *
 * Therefore on the question detail page an <a> tag isnt rendered,
 * so the chips can be rendered
 *
 * @param {string} link - an optional link
 * @param {*} children - The children
 */
const QuestionActionArea = ({ link = null, children }: IProps) => {
  if (link)
    return (
      <CardActionArea component={Link} to={link}>
        {children}
      </CardActionArea>
    );

  return <div>{children}</div>;
};

export default QuestionActionArea;
