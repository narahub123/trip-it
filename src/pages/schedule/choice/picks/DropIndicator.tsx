import React from "react";
import "./dropIndicator.css";

export interface DropIndicatorProps {
  row: string;
  col: string;
  onDragLeave: React.DragEventHandler<HTMLLIElement>;
  onDragOver: React.DragEventHandler<HTMLLIElement>;
  onDrop: React.DragEventHandler<HTMLLIElement>;
}

const DropIndicator = ({
  row,
  col,
  onDragLeave,
  onDragOver,
  onDrop,
}: DropIndicatorProps) => {
  return (
    <li
      className="dropIndicator"
      data-row={row}
      data-col={col}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <p className="separator"></p>
    </li>
  );
};

export default DropIndicator;
