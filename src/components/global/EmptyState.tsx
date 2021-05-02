/**
 * Primary dependencies
 */
import { Link } from "react-router-dom";
import {
  Button,
  withStyles,
  createStyles,
  Card,
  CardHeader,
  Theme,
} from "@material-ui/core";
import { Replay, Error } from "@material-ui/icons";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto",
    },
    icon: {
      fontSize: "3em",
    },
    header: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "center",
    },
    iconContainer: {
      textAlign: "center",
    },
  });

/**
 * Componenet Types
 */
type IProps = {
  message?: string;
  action?: () => void;
  actionLabel?: string;
  classes: {
    wrapper: string;
    icon: string;
    header: string;
    iconContainer: string;
  };
};

/**
 * Renders an Error
 *  for the application
 */
const EmptyState = ({
  message = undefined,
  classes,
  action = undefined,
  actionLabel = "Try Again",
}: IProps) => (
  <Card elevation={3} className={classes.wrapper}>
    <div className={classes.iconContainer}>
      <Error color="error" className={classes.icon} />
    </div>
    <CardHeader
      title={message ? message : "There was a problem"}
      className={classes.header}
    />
    {action ? (
      <Button
        className={classes.iconContainer}
        variant="contained"
        color="secondary"
        endIcon={<Replay />}
        onClick={action}
      >
        {actionLabel}
      </Button>
    ) : (
      <Button component={Link} to="/" color="primary" variant="contained">
        Home
      </Button>
    )}
  </Card>
);

export default withStyles(styles)(EmptyState);
