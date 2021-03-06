import {
  Button,
  createStyles,
  FormHelperText,
  makeStyles,
  Fade,
  Theme,
  Typography,
} from "@material-ui/core";
import { Clear, PhotoCamera } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useQuestion } from "./../CreateQuestion";
import PreviewDocument from "./../../../../helpers/PreviewImage";
import { config } from "../../../../config/config";

/**
 * Injected styles
 *
 * @param {Theme} theme
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      margin: theme.spacing(3),
    },
    label: {
      display: "flex",
      flexDirection: "column",
      margin: `${theme.spacing(4)}px auto`,
    },
    input: {
      display: "none",
    },
    uploadHelpText: {
      textAlign: "center",
    },
  })
);

/**
 * QuestionImage Component
 *
 * Optionally upload an image to the question
 */
const QuestionImage = () => {
  const classes = useStyles();
  const [question, setQuestion] = useQuestion();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [error, setError] = useState("");

  /**
   * Check if an existing image is on the question object
   * If so, set preview mode to true and display that image
   */
  useEffect(() => {
    if (question.image !== "") {
      return setUploaded(true);
    }
    setUploaded(false);
  }, [question, uploaded]);

  /**
   * Handle a file upload from the user,
   * validate it and convert it to base64 format
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   */
  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return setError("Please upload an image");
    }
    const file = event.target.files[0];

    if (file.size > 6145728)
      return setError("Upload cannot be greater than 6 MegaBytes");
    setError("");

    try {
      const img = await getBase64Image(file);
      if (typeof img === "string") {
        let newQuestion = question;
        newQuestion.image = img;

        setQuestion(newQuestion);
        return setUploaded(true);
      }
      setError("Could not upload image");
    } catch (err) {
      setError(("Could not upload file: " + err) as string);
    }
  };

  /**
   * Convert the file to Base64 format
   *
   * @param {File} file
   * @returns {string | null} Promise with either a string of the image, or null
   */
  const getBase64Image = (file: File) => {
    return new Promise<string | null>(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  /**
   * Clear the current upload
   */
  const clearUpload = () => {
    let newQuestion = question;
    newQuestion.image = "";
    setUploaded(false);
    setQuestion(newQuestion);
  };

  /**
   * Render JSX
   */
  return (
    <div className={classes.root}>
      <Typography variant="h1">Add an Image</Typography>
      {uploaded ? (
        <React.Fragment>
          <PreviewDocument
            photo={
              question.image.includes("base64")
                ? question.image
                : config.server_url + "/images/" + question.image
            }
          />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => clearUpload()}
            endIcon={<Clear />}
            className={classes.label}
          >
            Clear
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};
export default QuestionImage;
