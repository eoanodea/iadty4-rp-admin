import React, { useEffect } from "react";

import {
  CardMedia,
  createStyles,
  Fade,
  makeStyles,
  Theme,
} from "@material-ui/core";

import Loading from "./../components/global/Loading";
import EmptyState from "./../components/global/EmptyState";

/**
 * Injected styles
 *
 * @param {Theme} theme
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    preview: {
      height: 200,
      minWidth: 200,
      margin: `${theme.spacing(2)}px auto`,
      backgroundSize: "contain",
    },
    cardText: {
      textAlign: "center",
    },
  })
);

/**
 * Component Props
 */
interface IProps {
  photo: string;
}

/**
 * PreviewDocument Component
 *
 * @param {string} photo - the photo in either base64 format or a URL
 */
const PreviewDocument = ({ photo }: IProps) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [preview, setPreview] = React.useState<string>("");

  useEffect(() => {
    /**
     * Check if a photo exists and there is no
     *  current preview, and if so set the preview
     */
    if (photo && preview === "") {
      setPreview(photo);
      setLoading(false);
    } else setLoading(false); // if not set loading to false, and the component will render an error
  }, [preview, photo]);

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (!preview) return <EmptyState message="Could not preview image" />;
  return (
    <Fade in={true}>
      <CardMedia image={preview} className={classes.preview} />
    </Fade>
  );
};

export default PreviewDocument;
