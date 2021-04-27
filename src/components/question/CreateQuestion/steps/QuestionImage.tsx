import {
  Button,
  createStyles,
  FormHelperText,
  makeStyles,
  Paper,
  Fade,
  Theme,
  Typography,
} from "@material-ui/core";
import { CloudUpload, PhotoCamera } from "@material-ui/icons";
import React, { useState } from "react";
import { useQuestions } from "..";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      margin: theme.spacing(3),
    },
    label: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(4),
    },
    input: {
      display: "none",
    },
    uploadHelpText: {
      textAlign: "center",
    },
  })
);

const QuestionImage = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useQuestions();
  const [upload, setUpload] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState("");

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return setError("Please upload an image");
    }
    const file = event.target.files[0];

    if (file.size > 6145728)
      return setError("Upload cannot be greater than 6 MegaBytes");
    setError("");

    // const name = event.target.name;
    try {
      const img = await getBase64Image(file);

      setUpload(img as ArrayBuffer);
    } catch (err) {
      setError(("Could not upload file: " + err) as string);
    }
  };

  const getBase64Image = (file: File) => {
    return new Promise<string | ArrayBuffer | null>(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const clearUpload = () => {
    setUpload(null);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Add an Image</Typography>

      <input
        accept=".jpg, .png, .jpeg"
        className={classes.input}
        id="photo-upload"
        type="file"
        name={"photo-upload"}
        onChange={(e) => onFileUpload(e)}
      />
      <Fade in={true}>
        <label htmlFor="photo-upload" className={classes.label}>
          <Button
            variant="contained"
            color="secondary"
            component="span"
            endIcon={<PhotoCamera />}
          >
            Upload
          </Button>
          <FormHelperText
            error={error !== ""}
            className={classes.uploadHelpText}
          >
            {error ? error : "Maximum Size: 6 MB"}
          </FormHelperText>
        </label>
      </Fade>
    </div>
  );
};
export default QuestionImage;
