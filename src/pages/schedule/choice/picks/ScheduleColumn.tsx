import React, { useState } from "react";
import "./scheduleColumn.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import DropIndicator from "./DropIndicator";
const ScheduleColumn = () => {
  const [isActive, setIsActive] = useState(false);
  const goalCol = useSelector((state: Rootstate) => state.columnPlaces.goalCol);
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();
    console.log("enter");
    console.log(e.currentTarget.className);

    setIsActive(true);
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    console.log("leave");
    setIsActive(false);
  };

  //   const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  //     console.log("end");
  //     setIsActive(false);
  //   };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    console.log("drop");
    setIsActive(false);
  };

  return (
    <div className="schedule-column">
      <div className="schedule-column-date">
        <p>날짜1</p>
      </div>
      <div
        className={
          isActive ? "schedule-column-list active" : "schedule-column-list"
        }
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <ul>
          {!isActive && (
            <li className="place-indicator">
              <p>원하는 장소를 드래그 해주세요</p>
            </li>
          )}
          <DropIndicator
            row="_1"
            col="0"
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </ul>
      </div>
    </div>
  );
};

export default ScheduleColumn;
