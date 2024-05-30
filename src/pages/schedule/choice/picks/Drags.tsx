import React, { useEffect, useState } from "react";
import "./drags.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  removeContentId,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import PlaceCard from "../places/PlaceCard";
import { LuTrash2 } from "react-icons/lu";
import DropIndicator from "./DropIndicator";
import {
  dragBtwColumn,
  dragInColumn,
  fetchSelectedPlaces,
  setDraggedPlace,
  setGoalCol,
  setGoalRow,
  setcurCol,
  setcurRow,
} from "../../../../store/slices/columnPlacesSlice";

const Drags = () => {
  const dispatch = useDispatch();

  const column_1 = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces.columnPlaces_1
  );

  const curRow = useSelector((state: Rootstate) => state.columnPlaces.curRow);
  const goalRow = useSelector((state: Rootstate) => state.columnPlaces.goalRow);
  const curCol = useSelector((state: Rootstate) => state.columnPlaces.curCol);
  const goalCol = useSelector((state: Rootstate) => state.columnPlaces.goalCol);
  const columnarry = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );

  const draggedPlace = useSelector(
    (state: Rootstate) => state.columnPlaces.draggedPlace
  );

  console.log(column_1);

  useEffect(() => {
    dispatch(fetchSelectedPlaces() as any);
  }, []);
  // 장소 삭제
  const handleDelete = (contentId: string) => {
    dispatch(removeSelectedPlace(contentId));
    dispatch(removeContentId(contentId));
    // 해당 컬럼 배열에서도 삭제
  };

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const curRow = e.currentTarget.dataset.row;
    const curCol = e.currentTarget.dataset.col;
    if (curRow) dispatch(setcurRow(curRow));
    if (curCol) dispatch(setcurCol(curCol));
    if (curRow && curCol) dispatch(setDraggedPlace({ curRow, curCol }));
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    console.log("leave");
  };
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    console.log("hi");
  };
  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    // 현재 위치
    const goalRow = e.currentTarget.dataset.row;
    const goalCol = e.currentTarget.dataset.col;
    if (goalRow) dispatch(setGoalRow(goalRow));
    if (goalCol) dispatch(setGoalCol(goalCol));

    console.log("같은 컬럼", curCol === goalCol);

    // 현재 컬럼과 이동 컬럼이 동일한 경우 칼럼은 신경 쓸 필요 없음
    if (curCol === goalCol) {
      dispatch(dragInColumn());
    } else {
      dispatch(dragBtwColumn());
    }
  };

  console.log(curRow);

  console.log(draggedPlace);
  console.log(columnarry);

  return (
    <div className="dragColumn">
      <div className="picksIntro">
        <p>저장된 장소들</p>
      </div>
      <div className="draggablePlacesList">
        {(column_1?.length === 0 || !column_1) && (
          <div className="indicator">
            <p>장소 선택이 되지 않았습니다.</p>
            <p>장소를 먼저 선택해주세요.</p>
          </div>
        )}
        <ul>
          <DropIndicator
            row={"_1"}
            col={"_1"}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          {column_1 &&
            column_1.length > 0 &&
            column_1.map((draggablePlace) => (
              <>
                <li
                  className="draggableCard"
                  draggable
                  data-row={draggablePlace.contentid}
                  data-col={"_1"}
                  onDragStart={(e) => handleDragStart(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e)}
                >
                  <PlaceCard place={draggablePlace} />
                  <span
                    className="delete"
                    onClick={() => handleDelete(draggablePlace.contentid)}
                  >
                    <LuTrash2 />
                  </span>
                </li>
                <DropIndicator
                  row={draggablePlace.contentid}
                  col={"_1"}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              </>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Drags;
