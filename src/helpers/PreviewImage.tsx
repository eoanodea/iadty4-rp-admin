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

interface IProps {
  photo: string;
}

const PreviewDocument = ({ photo }: IProps) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [preview, setPreview] = React.useState<string>("");

  useEffect(() => {
    if (photo && preview === "") {
      setPreview(photo);
      setLoading(false);
    } else setLoading(false);
  }, [preview, photo]);

  if (loading)
    return (
      <Loading
      //message={"Loading preview..."}
      />
    );
  if (!preview) return <EmptyState message="Could not preview image" />;

  return (
    <Fade in={true}>
      <CardMedia image={preview} className={classes.preview} />
    </Fade>
  );
};

export default PreviewDocument;
