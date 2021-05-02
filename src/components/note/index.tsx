import { ArrowBack, Link as LinkIcon } from "@material-ui/icons";
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { LIST } from "./../../gql/note";
import { useQuery } from "@apollo/client";
import EmptyState from "./../global/EmptyState";
import Loading from "./../global/Loading";
import CreateNote from "./CreateNote";

/**
 * Injected styles
 *
 */
const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      padding: 10,
    },
  })
);
/**
 * Component Types
 */
type IProps = {
  i: number;
  hasNote: boolean;
  onSelect: (i: number, id: string) => void;
};

/**
 * NoteDialog Component
 *
 * @param {number} i - the index of the QuestionText within the list
 * @param {bool} hasNote - whether the QuestionText already has a note
 * @param {onSelect} onSelect - The function to call when a note has been selected
 */
const NoteDialog = ({ i, onSelect, hasNote = false }: IProps) => {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(LIST);

  const [createNote, setCreateNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  /**
   * A newely created note
   *
   * @param {string} title
   * @param {string} id
   */
  const newNote = (title: string, id: string) => {
    refetch();
    setSearchQuery(title);
    setCreateNote(false);
    selectItem(id);
  };

  /**
   * Selecting an item to send back to the Question Text
   *
   * @param {string} id
   */
  const selectItem = (id: string) => {
    onSelect(i, id);
    setOpenDialog(false);
  };
  /**
   * Filter the notes based on the search query
   */
  const filteredItems =
    data && data.getNotes
      ? data.getNotes.filter((item: any) => {
          if (searchQuery !== "")
            return item.title.toLowerCase().includes(searchQuery.toLowerCase());
          return true;
        })
      : [];
  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <IconButton
        onClick={() => setOpenDialog(true)}
        color={hasNote ? "primary" : "default"}
        className={classes.iconButton}
        aria-label="Add a link to text"
      >
        <LinkIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attach a note to this text"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Attaching a note allows the user to select this piece of text, and
            view more details about it
          </DialogContentText>
          {createNote ? (
            <React.Fragment>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setCreateNote(false)}
              >
                Back
              </Button>
              <CreateNote newNote={newNote} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TextField
                title="Search notes"
                label="Search existing notes"
                autoFocus={true}
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <List>
                {error ? (
                  <EmptyState message={error.message} />
                ) : loading ? (
                  <Loading />
                ) : filteredItems.length > 0 ? (
                  filteredItems.map((item: any) => {
                    return (
                      <ListItem
                        key={item.id}
                        button
                        onClick={() => selectItem(item.id)}
                      >
                        <ListItemText>{item.title}</ListItemText>
                      </ListItem>
                    );
                  })
                ) : (
                  <div>
                    <Typography>Could not find any notes</Typography>
                    <Button color="primary" onClick={() => setCreateNote(true)}>
                      Create one
                    </Button>
                  </div>
                )}
              </List>
            </React.Fragment>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default NoteDialog;
