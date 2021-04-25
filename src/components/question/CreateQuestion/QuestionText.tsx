import { removeDirectivesFromDocument } from "@apollo/client/utilities";
import {
  Accordion,
  Button,
  createStyles,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
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
import { motion, useMotionValue } from "framer-motion";
import React, {
  createRef,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { findIndex, Position } from "../../motion/findIndex";
import move from "array-move";
import FixedSizeList from "../../motion/FixedSizeList";
import { moveArray } from "../../motion/utils";
import { useFixedList } from "../../motion/fixed";

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

export interface ITextArr {
  id: number;
  title: string;
  height: number;
}

const QuestionText = () => {
  const classes = useStyles();

  const [activeText, setActiveText] = useState("");
  const [activeTextError, setActiveTextError] = useState("");

  const [editIndex, setEditIndex] = useState(-1);

  const [textArr, setTextArr] = useState<string[]>([]);

  const [items, setItems] = useState<ITextArr[]>(() => [
    { id: 1, title: "#A30006", height: 60 },
    { id: 2, title: "#2A6E78", height: 70 },
    { id: 3, title: "#6E1E62", height: 80 },
    { id: 4, title: "#DE4126", height: 90 },
  ]);

  const inputRef = createRef<HTMLInputElement>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (activeText.length < 2)
      return setActiveTextError("Text must be at least two characters");

    if (editIndex !== -1) {
      setTextArr((old) => {
        old[editIndex] = activeText;
        return [...old];
      });
      setEditIndex(-1);
    } else setTextArr((old) => [...old, activeText]);

    setActiveText("");
    setActiveTextError("");
  };

  const editItem = (index: number) => {
    setEditIndex(index);
    setActiveText(textArr[index]);
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  const removeItem = (index: number) => {
    setTextArr((old) => {
      old.splice(index, 1);
      return [...old];
    });
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

      {/* <List> */}
      {/* <div style={{ margin: "100px 0" }}> */}
      <FixedSizeList
        items={items}
        setItems={setItems}
        // onPositionUpdate={onPositionUpdate}
      >
        <h1>Hello!!</h1>
      </FixedSizeList>
      {/* <ul>
        {colors.map((text, i) => {
          return (
            <Item
              key={i}
              i={i}
              setPosition={setPosition}
              moveItem={moveItem}
              text={text}
              edit={editItem}
              remove={removeItem}
            />
          );
        })}
      </ul> */}
      {/* </div> */}
      {/* </List> */}
    </React.Fragment>
  );
};

interface IItem {
  i: number;
  text: string;
  edit: (i: number) => void;
  remove: (i: number) => void;
  setPosition: (i: number, offset: Position) => Position;
  moveItem: (i: number, dragOffset: number) => void;
}

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
};

const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];
const heights = {
  "#FF008C": 60,
  "#D309E1": 80,
  "#9C1AFF": 40,
  "#7700FF": 100,
};

const Item = ({ i, text, edit, remove, setPosition, moveItem }: IItem) => {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef<any>();

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY: any = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  // useEffect(() => {
  //   // if (ref && ref.current) {
  //   if (isDragging) {
  //     setPosition(i, {
  //       height: ref.current.offsetHeight,
  //       top: ref.current.offsetTop,
  //     });
  //   }
  //   // }
  // }, [isDragging, dragOriginY, i, setPosition]);

  // const MotionListItem = motion.custom(ListItem)

  return (
    <motion.li
      //@ts-ignore
      style={{ background: text, height: heights[text] }}
      // style={{ background: "red", height: 40 }}
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      // style={{ background: color, height: heights[color] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag="y"
      //@ts-ignore
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({
        delta,
      }: {
        delta: {
          x: number;
          y: number;
          width: number;
          height: number;
        };
      }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    />

    //   {/* <ListItem>
    //     <ListItemText>{text}</ListItemText>
    //     <ListItemIcon>
    //       <IconButton onClick={() => edit(i)}>
    //         <Edit />
    //       </IconButton>
    //     </ListItemIcon>
    //     <ListItemSecondaryAction onClick={() => remove(i)}>
    //       <IconButton edge="end" aria-label="comments">
    //         <Delete />
    //       </IconButton>
    //     </ListItemSecondaryAction>
    //   </ListItem>

    // // <ListItem>
    // // <ListItemText>{text}</ListItemText>
    // // <ListItemIcon>
    // //   <IconButton onClick={() => edit(i)}>
    // //     <Edit />
    // //   </IconButton>
    // // </ListItemIcon>
    // // <ListItemSecondaryAction onClick={() => remove(i)}>
    // //   <IconButton edge="end" aria-label="comments">
    // //     <Delete />
    // //   </IconButton>
    // // </ListItemSecondaryAction>
    // // </ListItem> */}
    // // </motion.li>
  );
};

export default QuestionText;
