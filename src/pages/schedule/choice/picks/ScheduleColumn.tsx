import React, { useCallback, useEffect, useState } from "react";
import "./scheduleColumn.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import DropIndicator from "./DropIndicator";
import { destrucDate, getWeek } from "../../../../utils/date";
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
import { setItems } from "../../../../store/slices/accommoSlice";
import { useRenderCount } from "@uidotdev/usehooks";
import PossibleCard from "./PossibleCard";

interface ScheduleColumnProps {
  date: DestrucDateType;
  index: number;
}

const ScheduleColumn = ({ date, index }: ScheduleColumnProps) => {
  const limitOfPlaces = 10;
  const [possible, setPossible] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const curCol = useSelector((state: Rootstate) => state.columnPlaces.curCol);
  const curRow = useSelector((state: Rootstate) => state.columnPlaces.curRow);
  const goalRow = useSelector((state: Rootstate) => state.columnPlaces.goalRow);
  const items = useSelector((state: Rootstate) => state.accommo.items);
  const dates = useSelector((state: Rootstate) => state.date.datesArray);
  // 렌더링 개수
  const count = useRenderCount();
  console.log("렌더링 개수", count);

  // drag한 컬럼
  const selectedPlaceColumn = useSelector(
    (state: Rootstate) =>
      state.columnPlaces.columnPlaces[
        `columnPlaces${curCol}` as keyof typeof state.columnPlaces.columnPlaces
      ]
  );

  // drag한 장소
  const selectedPlace = selectedPlaceColumn[Number(curRow)];

  console.log(selectedPlace);

  // 현재 컬럼
  const columnPlaces = useSelector(
    (state: Rootstate) =>
      state.columnPlaces.columnPlaces[
        `columnPlaces${index}` as keyof typeof state.columnPlaces.columnPlaces
      ] || []
  );

  // 숙소 최대 허용 개수
  const maxOfAccommoNum = 2;

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
  };
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset.row);
    const overRow = e.currentTarget.dataset.row;

    setPossible(overRow);

    setIsActive(true);
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    setIsActive(false);
    setPossible(undefined);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setPossible(undefined);

    // 장소 최대 개수 초과 여부 유효성 검사
    if (columnPlaces.length === limitOfPlaces) {
      alert(`하루 최대 허용 장소 개수 ${limitOfPlaces}개를 초과하였습니다.`);
      return;
    }

    // 숙소 최대 개수 초과 여부 유효성 검삭
    const accommos = columnPlaces.filter(
      (place) => place.contenttypeid === "32"
    );

    if (
      dates.length - 1 === index &&
      selectedPlace.contenttypeid === "32" &&
      accommos.length === maxOfAccommoNum - 1
    ) {
      alert(
        `숙소 최대 개수 ${
          maxOfAccommoNum - 1
        }개가 되었습니다. 숙소를 추가할 수 없습니다.`
      );
      return;
    }
    if (
      selectedPlace.contenttypeid === "32" &&
      accommos.length === maxOfAccommoNum
    ) {
      alert(
        `숙소 최대 개수 ${maxOfAccommoNum}개가 되었습니다. 숙소를 추가할 수 없습니다.`
      );
      return;
    }

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
    } else {
      dispatch(dragBtwColumn(date)); // 컬럼 간 드래그 앤 드롭
    }
  };

  // 장소 삭제
  const handleDelete = (contentId: string, order: number) => {
    console.log("number of item", order);

    // 컬럼 목록에서 삭제하기
    dispatch(
      removePlaceFromColumn({ column: index.toString(), index: order }) as any
    );

    // 숙소의 경우 숙소 배열에서 제거 필요
    const updatedColumns = items.map((item) =>
      item.index === index ? { ...item, contentId: "" } : item
    );
    dispatch(setItems(updatedColumns));
  };

  return (
    <div className="schedule-column" key={`col${index}`}>
      <div className="schedule-column-date">
        <p>
          {`${date.year}.${date.month + 1}.${date.date}(${getWeek(
            new Date(date.year, date.month, date.date)
          )}, ${index + 1}일차)`}
          {columnPlaces.length === limitOfPlaces
            ? `: 하루 허용 장소 수 ${limitOfPlaces}개 초과`
            : ` : ${columnPlaces.length}군데`}
        </p>
      </div>
      {columnPlaces.length === 0 ? (
        <div
          className={
            isActive ? "schedule-column-list active" : "schedule-column-list"
          }
          data-col={index.toString()}
          data-row={"_1"}
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
          </ul>
        </div>
      ) : (
        <div
          className={
            isActive ? "schedule-column-list active" : "schedule-column-list"
          }
        >
          <ul>
            {!isActive && columnPlaces?.length === 0 && (
              <li className="place-indicator" key={"indicator"}>
                <p>원하는 장소를 드래그 해주세요</p>
              </li>
            )}

            {columnPlaces.length < limitOfPlaces && (
              <>
                <DropIndicator
                  row="_1"
                  col={index.toString()}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  key={"_1"}
                />
                {possible === "_1" && selectedPlace && (
                  <li className="dropCard">
                    <span className="index">
                      <p>{1}</p>
                    </span>
                    <PossibleCard place={selectedPlace} />
                    <span
                      className="delete"
                      onClick={() => handleDelete(selectedPlace.contentid, 0)}
                    >
                      <LuTrash2 />
                    </span>
                  </li>
                )}
              </>
            )}
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
                    <DropCard
                      place={place}
                      date={date}
                      column={index}
                      row={i}
                    />
                    <span
                      className="delete"
                      onClick={() => handleDelete(place.contentid, i)}
                    >
                      <LuTrash2 />
                    </span>
                  </li>

                  {columnPlaces.length < limitOfPlaces && (
                    <DropIndicator
                      col={index.toString()}
                      row={i.toString()}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      key={i}
                    />
                  )}
                  {curCol === index.toString()
                    ? possible === i.toString() &&
                      curRow !== i.toString() &&
                      i.toString() !== (Number(curRow) - 1).toString() &&
                      selectedPlace && (
                        <li className="dropCard">
                          <span className="index">
                            <p>{i + 2}</p>
                          </span>
                          <PossibleCard place={selectedPlace} />
                          <span
                            className="delete"
                            onClick={() => handleDelete(place.contentid, i)}
                          >
                            <LuTrash2 />
                          </span>
                        </li>
                      )
                    : possible === i.toString() &&
                      selectedPlace && (
                        <li className="dropCard">
                          <span className="index">
                            <p>{i + 2}</p>
                          </span>
                          <PossibleCard place={selectedPlace} />
                          <span
                            className="delete"
                            onClick={() => handleDelete(place.contentid, i)}
                          >
                            <LuTrash2 />
                          </span>
                        </li>
                      )}
                </>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScheduleColumn;
