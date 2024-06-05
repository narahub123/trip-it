import React, { useCallback, useEffect, useState } from "react";
import "./scheduleColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import DropIndicator from "./DropIndicator";
import { destrucDate, getWeek } from "../../../../utils/date";
import { DestrucDateType } from "../dates/Calendar";
import {
  addPlaceToColumn,
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
import { removeSelectedPlace } from "../../../../store/slices/placeSlice";
import { setColumns } from "../../../../store/slices/accommoSlice";
import { useRenderCount } from "@uidotdev/usehooks";

interface ScheduleColumnProps {
  date: DestrucDateType;
  index: number;
}

const ScheduleColumn = ({ date, index }: ScheduleColumnProps) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const curCol = useSelector((state: Rootstate) => state.columnPlaces.curCol);
  const columns = useSelector((state: Rootstate) => state.accommo.columns);
  // 렌더링 개수
  const count = useRenderCount();
  console.log("렌더링 개수", count);

  // 이부분을 바꿔야 함
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );

  const columnPlaces = useSelector(
    (state: Rootstate) =>
      state.columnPlaces.columnPlaces[
        `columnPlaces${index}` as keyof typeof state.columnPlaces.columnPlaces
      ] || []
  );

  const length = columnPlaces && columnPlaces?.length;

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const curRow = e.currentTarget.dataset.row;
    const curCol = e.currentTarget.dataset.col;
    const contentId = e.currentTarget.dataset.content;

    if (curRow) dispatch(setcurRow(curRow));
    if (curCol) dispatch(setcurCol(curCol));
    if (contentId && curCol)
      dispatch(setDraggedPlace({ curRow: contentId, curCol }));

    console.log("curRow)", curRow);
    console.log("curCol", curCol);
    console.log("contentId", contentId);
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
    e.stopPropagation();

    // 이동하고자하는 위치
    const goalRow = e.currentTarget.dataset.row;
    const goalCol = e.currentTarget.dataset.col;

    if (goalRow) dispatch(setGoalRow(goalRow));
    if (goalCol) dispatch(setGoalCol(goalCol));

    console.log("goalRow", goalRow);
    console.log("goalCol", goalCol);

    setIsActive(false);

    // 현재 컬럼과 이동 컬럼이 동일한 경우 칼럼은 신경 쓸 필요 없음
    if (curCol === goalCol) {
      dispatch(dragInColumn()); // 컬럼 내 드래그 앤 드롭

      // dispatch(addScheduleDetail(date) as any);
    } else {
      dispatch(dragBtwColumn()); // 컬럼 간 드래그 앤 드롭
      // dispatch(addScheduleDetail(date) as any);
    }
  };

  // 장소 삭제
  const handleDelete = (contentId: string, order: number) => {
    console.log("number of item", order);

    // 선택된 장소들에서 삭제하기
    dispatch(removeSelectedPlace(contentId));

    // 컬럼 목록에서 삭제하기
    dispatch(removePlaceFromColumn({ column: index.toString(), index: order }));

    // 숙소의 경우 숙소 배열에서 제거 필요
    const updatedColumns = columns.map((column) =>
      column.index === index ? { ...column, contentId: "" } : column
    );
    dispatch(setColumns(updatedColumns));
  };

  console.log("columnPlaces", columnPlaces);

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
        data-row={columnPlaces?.length === 0 ? "_1" : (length - 1).toString()}
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
                  data-row={i.toString()}
                  data-content={place.contentid}
                  onDragStart={(e) => handleDragStart(e)}
                  draggable
                >
                  <span className="index">
                    <p>{i + 1}</p>
                  </span>
                  <DropCard place={place} date={date} column={index} />
                  <span
                    className="delete"
                    onClick={() => handleDelete(place.contentid, i)}
                  >
                    <LuTrash2 />
                  </span>
                </li>

                {i !== length - 1 && (
                  <DropIndicator
                    col={index.toString()}
                    row={i.toString()}
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
