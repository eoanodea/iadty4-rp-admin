import {
  createStyles,
  Divider,
  FormHelperText,
  Grow,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  Add,
  Close,
  Delete,
  DragIndicator,
  Edit,
  Link as LinkIcon,
} from "@material-ui/icons";
import { createRef, FormEvent, useCallback, useEffect, useState } from "react";
import { useQuestion } from "./../CreateQuestion";
import { IItem, IListItem } from "./../../../../types/question";
import FixedSizeList from "./../../../motion/FixedSizeList";
import NoteDialog from "./../../../note";

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
    inputContainer: {
      padding: "2px 4px",
      display: "flex",
      justifyContent: "center",
      margin: "auto",
      alignItems: "center",
      width: "80%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    listItem: {
      cursor: "move",
    },
  })
);

/**
 * QuestionText Component
 *
 * Allows the user to add Question Text,
 * and re order the text by dragging and dropping
 */
const QuestionText = () => {
  const classes = useStyles();

  const [question, setQuestion] = useQuestion();

  const [activeText, setActiveText] = useState("");
  const [activeTextError, setActiveTextError] = useState("");

  const [editIndex, setEditIndex] = useState(-1);

  const [items, setItems] = useState<IItem[]>(() => []);

  /**
   * Creates a Ref for the input field
   */
  const inputRef = createRef<HTMLInputElement>();
  /**
   * Sync the current items within the component with the question context
   */
  const syncQuestions = useCallback(() => {
    let newQuestion = question;
    newQuestion.text = items.map((item, i) => {
      return { order: i, text: item.text, note: item.note };
    });
    return setQuestion(newQuestion);
  }, [items, question, setQuestion]);

  useEffect(() => {
    /**
     * If there are existing items on the question, convert them to items
     */
    if (question.text.length > 0 && items.length === 0) {
      const newItems = question.text.map((item, i) => {
        return { id: i, text: item.text };
      });

      return setItems(newItems);
    }
    /**
     * Sync the questions
     */
    syncQuestions();
  }, [question, items, syncQuestions]);

  /**
   * Validate the text input, and if passes, add the text as an item
   *
   * @param {FormEvent} e
   */
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (activeText.length < 1)
      return setActiveTextError("Text must be at least one character");

    if (editIndex !== -1) {
      const itemI = items.findIndex((item) => item.id === editIndex);

      setItems((old) => {
        old[itemI].text = activeText;
        return [...old];
      });
      setEditIndex(-1);
    } else {
      const newItem = {
        id: items.length + 1,
        text: activeText,
      };
      setItems((old) => [...old, newItem]);
    }

    setActiveText("");
    setActiveTextError("");
  };

  /**
   * Edit an item
   *
   * @param {number} id
   */
  const editItem = (id: number) => {
    const itemI = items.findIndex((item) => item.id === id);
    setEditIndex(id);

    setActiveText(items[itemI].text);
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  /**
   * Remove an item
   *
   * @param {number} id
   */
  const removeItem = (id: number) => {
    const itemI = items.findIndex((item) => item.id === id);
    const newItems = items;

    newItems.splice(itemI, 1);
    setItems([...newItems]);
    syncQuestions();
  };

  /**
   * Attach a note to an existing question text
   *
   * @param {number} i
   * @param {string} id
   */
  const addNote = (i: number, id: string) => {
    const itemI = items.findIndex((item) => item.id === i);

    let newItems = items;
    newItems[itemI].note = id;
    setItems([...newItems]);
    syncQuestions();
  };

  /**
   * Renders a single list item
   *
   * @param {IListItem} - {id, text} - the id and text of the item
   * @returns
   */
  const Item = ({ id, text, note = "" }: IListItem) => {
    return (
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <DragIndicator />
        </ListItemIcon>
        <Grow in={true}>
          <ListItemText>{text}</ListItemText>
        </Grow>
        <ListItemIcon>
          <IconButton onClick={() => editItem(id)}>
            <Edit />
          </IconButton>
        </ListItemIcon>
        <ListItemSecondaryAction>
          <IconButton aria-label="comments" onClick={() => removeItem(id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
        <NoteDialog i={id} hasNote={note !== ""} onSelect={addNote} />

        <ListItemIcon></ListItemIcon>
      </ListItem>
    );
  };

  /**
   * Render JSX
   */
  return (
    <div className={classes.root}>
      <Typography variant="h1">Add Question Text</Typography>

      <Paper className={classes.inputContainer}>
        <InputBase
          className={classes.input}
          placeholder="Add a new text item"
          inputProps={{ "aria-label": "Add item" }}
          autoFocus={true}
          inputRef={inputRef}
          value={activeText}
          onChange={(e) => setActiveText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(e)}
          error={activeTextError !== ""}
        />
        <Grow in={editIndex !== -1}>
          <IconButton
            className={classes.iconButton}
            aria-label="Cancel edit"
            onClick={() => {
              setEditIndex(-1);
              setActiveText("");
            }}
          >
            <Close />
          </IconButton>
        </Grow>
        <IconButton
          className={classes.iconButton}
          aria-label={editIndex !== -1 ? "Edit" : "Create"}
          onClick={submit}
        >
          {editIndex !== -1 ? <Edit /> : <Add />}
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label="Add a link to text"
        >
          <LinkIcon />
        </IconButton>
      </Paper>
      <FormHelperText error>{activeTextError}</FormHelperText>
      <List>
        <FixedSizeList items={items} setItems={setItems} listItem={Item} />
      </List>
    </div>
  );
};

export default QuestionText;
