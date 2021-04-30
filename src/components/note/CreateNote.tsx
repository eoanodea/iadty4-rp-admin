import { useMutation } from "@apollo/client";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useState } from "react";
import { CREATE } from "../../gql/note";

type IProps = {
  newNote: (title: string, id: string) => void;
};

const CreateNote = ({ newNote }: IProps) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");

  const [loading, setLoading] = useState(false);

  const [createNote] = useMutation(CREATE);

  const [serverError, setServerError] = useState("");

  const handleValidation = () => {
    if (title.length < 3) {
      setTitleError("Title must be at least 3 characters");
      return false;
    }
    setTitleError("");

    if (note.length < 5) {
      setNoteError("Note must be at least 5 characters");
      return false;
    }
    setNoteError("");
    return true;
  };
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      setServerError("");
      createNote({
        variables: {
          questionText: "",
          input: {
            title,
            markdown: note,
          },
        },
      })
        .then((res: any) => {
          newNote(title, res.data.addNote.id);
        })
        .catch((err) => {
          setLoading(false);

          setServerError(err.toString());
        });
    }
  };

  return (
    <div>
      <TextField
        title="title"
        label="Title"
        autoFocus={true}
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && submit()}
        error={titleError !== ""}
        helperText={titleError}
      />
      <TextField
        aria-label="Note content"
        rows={8}
        label="Add your note content..."
        placeholder="Add your note content..."
        multiline
        value={note}
        onChange={(e) => setNote(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && submit()}
        error={noteError !== ""}
        helperText={noteError}
      />

      <Typography variant="caption" color="error">
        {serverError}
      </Typography>

      <Button
        disabled={loading}
        endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        variant="contained"
        color="primary"
        onClick={submit}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateNote;
