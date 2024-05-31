import React, { useState } from "react";
import "./scheduleColumn.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import DropIndicator from "./DropIndicator";
import { getWeek } from "../../../../utils/date";
import { DestrucDateType } from "../dates/Calendar";

interface ScheduleColumnProps {
  date: DestrucDateType;
  index: number;
}

const ScheduleColumn = ({ date, index }: ScheduleColumnProps) => {
  const [isActive, setIsActive] = useState(false);

  const columnPlaces = useSelector(
    (state: Rootstate) =>
      state.columnPlaces.columnPlaces[
        `columnPlaces${index}` as keyof typeof state.columnPlaces.columnPlaces
      ]
  );

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

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    console.log("drop");
    setIsActive(false);
  };

  console.log(columnPlaces);

  return (
    <div className="schedule-column">
      <div className="schedule-column-date">
        <p>{`${date.year}.${date.month + 1}.${date.date}(${getWeek(
          new Date(date.year, date.month, date.date)
        )}, ${index + 1}일차)`}</p>
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
          {!isActive && columnPlaces?.length === 0 && (
            <li className="place-indicator">
              <p>원하는 장소를 드래그 해주세요</p>
            </li>
          )}
          {columnPlaces && columnPlaces?.map((place) => <li>{place.title}</li>)}
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
