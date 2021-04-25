import { useState, useCallback } from "react";
import { PanInfo, AxisBox2D, BoxDelta } from "framer-motion";

export type FixedListProps<T> = {
  items: T[];
  swapDistance: number;
  onPositionUpdate: (from: number, to: number) => void;
  onPositionChange?: (startIndex: number, endIndex: number) => void;
};

export type FixedListItemProps = {
  handleChange: (i: number, dragOffset: number) => void;
  handleDragStart: (index: number) => void;
  handleDragEnd: (endIndex: number) => void;
};

export const findIndex = (
  i: number,
  offset: number,
  length: number,
  swapDistance: number
) => {
  let target = i;

  // If moving down
  if (offset > 0) {
    if (i === length - 1) return i;
    if (offset > swapDistance) target = i + 1;
  }
  // If moving up
  else if (offset < 0) {
    if (i === 0) return i;
    if (offset < -swapDistance) target = i - 1;
  }

  return Math.min(Math.max(target, 0), length);
};

export function useFixedList<T>({
  items,
  swapDistance,
  onPositionUpdate,
  onPositionChange,
}: FixedListProps<T>): FixedListItemProps {
  const [startIndex, handleDragStart] = useState(-1);

  const handleChange = useCallback(
    (i: number, dragOffset: number) => {
      const targetIndex = findIndex(i, dragOffset, items.length, swapDistance);
      if (targetIndex !== i) {
        onPositionUpdate(i, targetIndex);
      }
    },
    [items.length, swapDistance, onPositionUpdate]
  );

  const handleDragEnd = useCallback(
    (endIndex: number) => {
      if (onPositionChange && startIndex !== endIndex)
        onPositionChange(startIndex, endIndex);
      handleDragStart(-1);
    },
    [startIndex, onPositionChange]
  );

  return {
    handleChange,
    handleDragStart,
    handleDragEnd,
  };
}

type DragState = "idle" | "animating" | "dragging";

type FixedListItemResult = [
  DragState,
  {
    onDragStart(
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ): void;
    onDragEnd(
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ): void;
    onAnimationComplete(): void;
    onViewportBoxUpdate(box: AxisBox2D, delta: BoxDelta): void;
  }
];

export function useFixedListItem(
  index: number,
  { handleChange, handleDragStart, handleDragEnd }: FixedListItemProps
): FixedListItemResult {
  const [state, setState] = useState<DragState>("idle");

  return [
    state,
    {
      onDragStart: () => {
        setState("dragging");
        handleDragStart(index);
      },
      onDragEnd: () => {
        setState("animating");
        handleDragEnd(index);
      },
      onAnimationComplete: () => {
        if (state === "animating") setState("idle");
      },
      onViewportBoxUpdate: (_viewportBox, delta) => {
        if (state === "dragging") handleChange(index, delta.y.translate);
      },
    },
  ];
}
