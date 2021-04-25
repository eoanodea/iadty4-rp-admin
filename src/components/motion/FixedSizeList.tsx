import React, { useCallback } from "react";
import { motion } from "framer-motion";

import { useFixedList, useFixedListItem, FixedListItemProps } from "./fixed";
import { getDragStateZIndex, moveArray } from "./utils";

import { ITextArr } from "../question/CreateQuestion/QuestionText";

type FixedSizeItemProps = {
  index: number;
  height: number;
  color: string;
  itemProps: FixedListItemProps;
  children: JSX.Element;
};

function FixedSizeItem({
  index,
  height,
  color,
  itemProps,
  children,
}: FixedSizeItemProps) {
  const [dragState, eventHandlers] = useFixedListItem(index, itemProps);

  return (
    <li
      style={{
        padding: 0,
        height,
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        zIndex: getDragStateZIndex(dragState),
      }}
    >
      <motion.div
        layout
        initial={false}
        drag="y"
        style={{
          background: color,
          height,
          borderRadius: 5,
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
        }}
        whileTap={{
          scale: 1.12,
          boxShadow: "0px 5px 5px rgba(0,0,0,0.1)",
        }}
        {...eventHandlers}
      >
        {children}
      </motion.div>
    </li>
  );
}
interface IProps {
  items: ITextArr[];
  setItems: (items: ITextArr[]) => void;
  children: JSX.Element;
  // onPositionUpdate: (startIndex: number, endIndex: number) => void;
}
export default function FixedSizeList({ items, setItems, children }: IProps) {
  //   {
  //   items,
  //   setItems,
  // }: // onPositionUpdate,
  // IProps
  // const [items, setItems] = useItems();
  const onPositionUpdate = useCallback(
    (startIndex: number, endIndex: number) => {
      setItems(moveArray(items, startIndex, endIndex));
    },
    [items, setItems]
  );

  const props = useFixedList({
    items,
    swapDistance: 60,
    onPositionUpdate,
  });

  return (
    <ul>
      {items.map((item, i) => (
        <FixedSizeItem
          // key={`${item}-${i}`}
          key={item.id}
          height={60}
          color={item.title}
          // children={children}
          index={i}
          itemProps={props}
        >
          {children}
        </FixedSizeItem>
      ))}
    </ul>
  );
}
