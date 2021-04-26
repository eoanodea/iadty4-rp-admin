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
} from "@material-ui/core";
import { Add, Close, Delete, Edit, Link as LinkIcon } from "@material-ui/icons";
import React, { createRef, FormEvent, useState } from "react";
import FixedSizeList from "../../motion/FixedSizeList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
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
  })
);

export interface IItem {
  id: number;
  text: string;
}

export interface IListItem extends IItem {
  i: number;
}

const QuestionText = () => {
  const classes = useStyles();

  const [activeText, setActiveText] = useState("");
  const [activeTextError, setActiveTextError] = useState("");

  const [editIndex, setEditIndex] = useState(-1);

  const [items, setItems] = useState<IItem[]>(() => []);

  const inputRef = createRef<HTMLInputElement>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (activeText.length < 2)
      return setActiveTextError("Text must be at least two characters");

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

  const editItem = (id: number) => {
    const itemI = items.findIndex((item) => item.id === id);
    setEditIndex(id);

    setActiveText(items[itemI].text);
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  const removeItem = (id: number) => {
    const itemI = items.findIndex((item) => item.id === id);

    setItems((old) => {
      old.splice(itemI, 1);
      return [...old];
    });
  };

  const Item = ({ id, text }: IListItem) => {
    return (
      <ListItem>
        <ListItemText>{text}</ListItemText>
        <ListItemIcon>
          <IconButton onClick={() => editItem(id)}>
            <Edit />
          </IconButton>
        </ListItemIcon>
        <ListItemSecondaryAction onClick={() => removeItem(id)}>
          <IconButton edge="end" aria-label="comments">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
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
          color="primary"
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
    </React.Fragment>
  );
};

export default QuestionText;
