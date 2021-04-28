import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardMedia,
  createStyles,
  Fade,
  makeStyles,
  Theme,
} from "@material-ui/core";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    preview: {
      height: 200,
      maxWidth: "80%",
      margin: `${theme.spacing(2)}px auto`,
      backgroundSize: "contain",
    },
    card: {},
    cardText: {
      textAlign: "center",
    },
  })
);
// });
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
    <Card className={classes.card}>
      <Fade in={true}>
        <CardMedia image={preview} className={classes.preview} />
      </Fade>

      <CardHeader
        // title={photo && photo.name ? photo.name : ""}
        className={classes.cardText}
      />
    </Card>
  );
};

export default PreviewDocument;
