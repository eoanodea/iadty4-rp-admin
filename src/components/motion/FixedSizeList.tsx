import React, { useCallback } from "react";
import { motion } from "framer-motion";

import { useFixedList, useFixedListItem, FixedListItemProps } from "./fixed";
import { getDragStateZIndex, moveArray } from "./utils";

import { IItem, IListItem } from "../../types/question";

type FixedSizeItemProps = {
  index: number;
  height: number;
  item: IListItem;
  itemProps: FixedListItemProps;
  listItem: (item: IListItem) => JSX.Element;
};

function FixedSizeItem({
  index,
  height,
  item,
  itemProps,
  listItem,
}: FixedSizeItemProps) {
  const [dragState, eventHandlers] = useFixedListItem(index, itemProps);

  return (
    <div
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
        {listItem(item)}
      </motion.div>
    </div>
  );
}
interface IProps {
  items: IItem[];
  setItems: (items: IItem[]) => void;
  listItem: (item: IListItem) => JSX.Element;
}
export default function FixedSizeList({ items, setItems, listItem }: IProps) {
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
    <React.Fragment>
      {items.map((item, i) => (
        <FixedSizeItem
          key={item.id}
          index={i}
          height={60}
          item={{ i, ...item }}
          listItem={listItem}
          itemProps={props}
        ></FixedSizeItem>
      ))}
    </React.Fragment>
  );
}
