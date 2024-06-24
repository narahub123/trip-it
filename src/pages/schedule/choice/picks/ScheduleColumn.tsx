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
  colNum: number;
}

const ScheduleColumn = ({ date, colNum }: ScheduleColumnProps) => {
  const limitOfPlaces = 10;
  const [possible, setPossible] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const curCol = useSelector((state: Rootstate) => state.columnPlaces.curCol);
  const curRow = useSelector((state: Rootstate) => state.columnPlaces.curRow);
  const items = useSelector((state: Rootstate) => state.accommo.items);
  const dates = useSelector((state: Rootstate) => state.date.datesArray);
  const mapCol = useSelector((state: Rootstate) => state.map.mapColumns);
  const mapColumn = mapCol[`mapColumn${colNum}`];

  // console.log("mapColumn", mapColumn);

  const selectedPlace = useSelector(
    (state: Rootstate) => state.columnPlaces.draggedPlace
  );

  // 렌더링 개수
  const count = useRenderCount();
  // console.log("렌더링 개수", count);

  // 현재 컬럼
  const columnPlaces = useSelector(
    (state: Rootstate) =>
      state.columnPlaces.columnPlaces[
        `columnPlaces${colNum}` as keyof typeof state.columnPlaces.columnPlaces
      ] || []
  );

  // 숙소 최대 허용 개수
  const maxOfAccommoNum = 2;

  const colLength = columnPlaces && columnPlaces?.length;

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
    // console.log(e.currentTarget.dataset.row);
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

    // 이동하고자하는 위치
    const goalRow = e.currentTarget.dataset.row;
    const goalCol = e.currentTarget.dataset.col;

    if (goalRow) dispatch(setGoalRow(goalRow));
    if (goalCol) dispatch(setGoalCol(goalCol));

    // console.log("goalRow", goalRow);
    // console.log("goalCol", goalCol);

    // 드롭 유효성 : 변경 혹은 삭제 가능함
    if (
      (curCol == goalCol && curRow === goalRow) ||
      (curCol == goalCol && (Number(curRow) - 1).toString() === goalRow)
    ) {
      setIsActive(false);
      setPossible(undefined);
      return false;
    }

    // 장소 최대 개수 초과 여부 유효성 검사
    if (colLength === limitOfPlaces) {
      alert(`하루 최대 허용 장소 개수 ${limitOfPlaces}개를 초과하였습니다.`);
      setIsActive(false);
      return;
    }

    // 숙소 최대 개수 초과 여부 유효성 검삭
    const accommos = columnPlaces.filter(
      (place) => place.contenttypeid === "32"
    );

    if (
      dates.length - 1 === colNum &&
      selectedPlace &&
      selectedPlace.contenttypeid === "32" &&
      accommos.length === maxOfAccommoNum - 1
    ) {
      alert(
        `숙소 최대 개수 ${
          maxOfAccommoNum - 1
        }개가 되었습니다. 숙소를 추가할 수 없습니다.`
      );
      setIsActive(false);
      return;
    }
    if (
      selectedPlace &&
      selectedPlace.contenttypeid === "32" &&
      accommos.length === maxOfAccommoNum &&
      curCol !== goalCol
    ) {
      alert(
        `숙소 최대 개수 ${maxOfAccommoNum}개가 되었습니다. 숙소를 추가할 수 없습니다.`
      );
      setIsActive(false);
      return;
    }

    setIsActive(false);

    // 현재 컬럼과 이동 컬럼이 동일한 경우 칼럼은 신경 쓸 필요 없음
    if (curCol === goalCol) {
      dispatch(dragInColumn()); // 컬럼 내 드래그 앤 드롭
    } else {
      if (goalCol === "_1") {
        alert(`장소 보관함으로는 이동할 수 없습니다.`);
        return;
      }
      dispatch(dragBtwColumn(date)); // 컬럼 간 드래그 앤 드롭
    }
  };

  // 장소 삭제
  const handleDelete = (order: number) => {
    if (!window.confirm(`이장소를 삭제하시겠습니까?`)) {
      return false;
    }
    // console.log("number of item", order);

    // 컬럼 목록에서 삭제하기
    dispatch(
      removePlaceFromColumn({ column: colNum.toString(), index: order }) as any
    );

    // 숙소의 경우 숙소 배열에서 제거 필요
    const updatedColumns = items.map((item) =>
      item.index === colNum ? { ...item, contentId: "" } : item
    );
    dispatch(setItems(updatedColumns));
  };

  return (
    <div className="schedule-column" key={`col${colNum}`}>
      <div className="schedule-column-date">
        <p>
          {`${date.year}.${date.month + 1}.${date.date}(${getWeek(
            new Date(date.year, date.month, date.date)
          )}, ${colNum + 1}일차)`}
          {colLength === limitOfPlaces
            ? `: 하루 허용 장소 수 ${limitOfPlaces}개 초과`
            : ` (${colLength}/10)`}
        </p>
      </div>
      {colLength === 0 ? (
        <div
          className={
            isActive ? "schedule-column-list active" : "schedule-column-list"
          }
          data-col={colNum.toString()}
          data-row={"_1"}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <ul>
            {!isActive && colLength === 0 && (
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
          key={`columnPlaces${colNum}_${date.date}`}
        >
          <ul>
            {!isActive && colLength === 0 && (
              <li className="place-indicator" key={"indicator"}>
                <p>원하는 장소를 드래그 해주세요</p>
              </li>
            )}

            {colLength < limitOfPlaces &&
            selectedPlace &&
            !(curCol == colNum.toString() && curRow === "0") &&
            selectedPlace.contentid !== columnPlaces[0].contentid ? (
              <DropIndicator
                row="_1"
                col={colNum.toString()}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                key={"_1"}
              />
            ) : (
              <li
                className="dropIndicator"
                data-col={colNum.toString()}
                data-row={`_1`}
              >
                <p className="separator"></p>
              </li>
            )}
            {possible === "_1" &&
            selectedPlace &&
            !(curCol == colNum.toString() && curRow === "0") &&
            selectedPlace.contentid !== columnPlaces[0].contentid ? (
              <li className="possibleCard">
                <li className="dropCard">
                  <span className="index">
                    <p>{1}</p>
                  </span>
                  <PossibleCard place={selectedPlace} />
                  <span className="delete">
                    <LuTrash2 />
                  </span>
                </li>
              </li>
            ) : (
              <li className="hideCard"></li>
            )}

            {columnPlaces &&
              columnPlaces?.map((place, i) => (
                <>
                  {place ? (
                    <li
                      className="dropCard"
                      key={`${colNum}_${i}`}
                      data-col={colNum.toString()}
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
                        column={colNum}
                        row={i}
                      />
                      <span className="delete" onClick={() => handleDelete(i)}>
                        <LuTrash2 />
                      </span>
                    </li>
                  ) : (
                    <li className="hideCard"></li>
                  )}
                  {mapColumn && mapColumn[i] && (
                    <div>{`${Math.round(mapColumn[i]?.duration / 60)}분`}</div>
                  )}
                  {columnPlaces.length < limitOfPlaces &&
                  selectedPlace &&
                  !(curCol == colNum.toString() && i === Number(curRow) - 1) &&
                  !(
                    curCol == colNum.toString() &&
                    selectedPlace.contentid === place.contentid
                  ) ? (
                    <DropIndicator
                      col={colNum.toString()}
                      row={i.toString()}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      key={i}
                    />
                  ) : (
                    <li
                      className="dropIndicator"
                      data-col={colNum.toString()}
                      data-row={i.toString()}
                    >
                      <p className="separator"></p>
                    </li>
                  )}
                  {possible === i.toString() &&
                  selectedPlace &&
                  !(curCol == colNum.toString() && i === Number(curRow) - 1) &&
                  !(
                    curCol == colNum.toString() &&
                    selectedPlace.contentid === place.contentid
                  ) ? (
                    <li className="possibleCard">
                      <li className="dropCard">
                        <span className="index">
                          <p>{i + 2}</p>
                        </span>
                        <PossibleCard place={selectedPlace} />
                        <span
                          className="delete"
                          onClick={() => handleDelete(i)}
                        >
                          <LuTrash2 />
                        </span>
                      </li>
                    </li>
                  ) : (
                    <li className="hideCard"></li>
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
