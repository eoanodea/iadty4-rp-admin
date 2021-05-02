/**
 * Component Library imports
 */
import { CircularProgress, withStyles, createStyles } from "@material-ui/core";

/**
 * Injected styles
 *
 */
const styles = () =>
  createStyles({
    progressWrapper: {
      minHeight: "-webkit-fill-available",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

type IProps = {
  classes: {
    progressWrapper: string;
  };
};

/**
 * Renders an Activity Indicator
 *  for the application
 */
const Loading = ({ classes }: IProps) => (
  <div className={classes.progressWrapper}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loading);
