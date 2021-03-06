import { CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * Component Types
 */
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
