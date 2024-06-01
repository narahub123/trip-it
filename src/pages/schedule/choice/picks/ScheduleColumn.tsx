import React, { useState } from "react";
import "./scheduleColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import DropIndicator from "./DropIndicator";
import { getWeek } from "../../../../utils/date";
import { DestrucDateType } from "../dates/Calendar";
import {
  dragBtwColumn,
  dragInColumn,
  removePlaceFromColumn,
  setDraggedPlace,
  setGoalCol,
  setGoalRow,
  setcurCol,
  setcurRow,
} from "../../../../store/slices/columnPlacesSlice";
import { LuTrash2 } from "react-icons/lu";
import DropCard from "./DropCard";
import {
  removeContentId,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import {
  addScheduleDetail,
  removeScheduleDetail,
} from "../../../../store/slices/scheduleSlice";

interface ScheduleColumnProps {
  date: DestrucDateType;
  index: number;
}

const ScheduleColumn = ({ date, index }: ScheduleColumnProps) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const curCol = useSelector((state: Rootstate) => state.columnPlaces.curCol);

  const columnPlaces = useSelector(
    (state: Rootstate) =>
      state.columnPlaces.columnPlaces[
        `columnPlaces${index}` as keyof typeof state.columnPlaces.columnPlaces
      ] || []
  );

  const length = columnPlaces && columnPlaces?.length;
  const last = columnPlaces[length - 1];

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const curRow = e.currentTarget.dataset.row;
    const curCol = e.currentTarget.dataset.col;
    if (curRow) dispatch(setcurRow(curRow));
    if (curCol) dispatch(setcurCol(curCol));

    if (curRow && curCol) dispatch(setDraggedPlace({ curRow, curCol }));
  };
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();

    setIsActive(true);
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    setIsActive(false);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();

    // 이동하고자하는 위치
    const goalRow = e.currentTarget.dataset.row;
    const goalCol = e.currentTarget.dataset.col;
    if (goalRow) dispatch(setGoalRow(goalRow));
    if (goalCol) dispatch(setGoalCol(goalCol));

    setIsActive(false);

    // 현재 컬럼과 이동 컬럼이 동일한 경우 칼럼은 신경 쓸 필요 없음
    if (curCol === goalCol) {
      dispatch(dragInColumn()); // 컬럼 내 드래그 앤 드롭
      dispatch(addScheduleDetail(date) as any);
    } else {
      dispatch(dragBtwColumn()); // 컬럼 간 드래그 앤 드롭
      dispatch(addScheduleDetail(date) as any);
    }
  };

  // 장소 삭제
  const handleDelete = (contentId: string) => {
    dispatch(removeSelectedPlace(contentId));
    dispatch(removeContentId(contentId));
    dispatch(removePlaceFromColumn({ column: index.toString(), contentId }));
    dispatch(removeScheduleDetail(contentId));
  };

  return (
    <div className="schedule-column" key={`col${index}`}>
      <div className="schedule-column-date">
        <p>{`${date.year}.${date.month + 1}.${date.date}(${getWeek(
          new Date(date.year, date.month, date.date)
        )}, ${index + 1}일차)`}</p>
      </div>
      <div
        className={
          isActive ? "schedule-column-list active" : "schedule-column-list"
        }
        data-col={index.toString()}
        data-row={columnPlaces?.length === 0 ? "_1" : last.contentid}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <ul>
          {!isActive && columnPlaces?.length === 0 && (
            <li className="place-indicator" key={"indicator"}>
              <p>원하는 장소를 드래그 해주세요</p>
            </li>
          )}

          <DropIndicator
            row="_1"
            col={index.toString()}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            key={"_1"}
          />

          {columnPlaces &&
            columnPlaces?.map((place, i) => (
              <>
                <li
                  className="dropCard"
                  key={place.contentid}
                  data-col={index.toString()}
                  data-row={place.contentid}
                  onDragStart={(e) => handleDragStart(e)}
                  draggable
                >
                  <span className="index">
                    <p>{i + 1}</p>
                  </span>
                  <DropCard place={place} date={date} />
                  <span
                    className="delete"
                    onClick={() => handleDelete(place.contentid)}
                  >
                    <LuTrash2 />
                  </span>
                </li>

                {i !== length - 1 && (
                  <DropIndicator
                    col={index.toString()}
                    row={place.contentid}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    key={i}
                  />
                )}
              </>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleColumn;
