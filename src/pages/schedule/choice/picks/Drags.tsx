import React, { useEffect, useState } from "react";
import "./drags.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { removeSelectedPlace } from "../../../../store/slices/placeSlice";
import PlaceCard from "../places/PlaceCard";
import { LuTrash2 } from "react-icons/lu";
import DropIndicator from "./DropIndicator";
import {
  clearAccommoFromColumnPlaces_1,
  dragBtwColumn,
  dragInColumn,
  removePlaceFromColumnPlaces_1,
  setDraggedPlace,
  setGoalCol,
  setGoalRow,
  setcurCol,
  setcurRow,
} from "../../../../store/slices/columnPlacesSlice";
import { setItems } from "../../../../store/slices/accommoSlice";

const Drags = () => {
  const dispatch = useDispatch();

  const column_1 = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces.columnPlaces_1
  );

  useEffect(() => {
    dispatch(clearAccommoFromColumnPlaces_1());
  }, []);

  const curRow = useSelector((state: Rootstate) => state.columnPlaces.curRow);
  const goalRow = useSelector((state: Rootstate) => state.columnPlaces.goalRow);
  const curCol = useSelector((state: Rootstate) => state.columnPlaces.curCol);
  const goalCol = useSelector((state: Rootstate) => state.columnPlaces.goalCol);

  const items = useSelector((state: Rootstate) => state.accommo.items);

  // console.log(column_1);

  // 장소 삭제
  const handleDelete = (contentId: string, index: number) => {
    // columnPlaces_1에서 삭제
    dispatch(removePlaceFromColumnPlaces_1(index));

    // 숙소의 경우 숙소 배열에서 제거 필요
    const updatedColumns = items.map((item) =>
      item.contentId === contentId ? { ...item, contentId: "" } : item
    );
    dispatch(setItems(updatedColumns));
  };

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
    // 이동하고자하는 위치
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

  // console.log(curRow);

  // console.log(draggedPlace);
  // console.log(columnarry);

  return (
    <div className="dragColumn">
      <div className="picksIntro">
        <p>저장된 장소들</p>
      </div>
      <div className="draggablePlacesList">
        {(column_1?.length === 0 || !column_1) && (
          <div className="indicator">
            <p key={1}>장소 선택이 되지 않았습니다.</p>
            <p key={2}>장소를 먼저 선택해주세요.</p>
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
            column_1.map((draggablePlace, index) => (
              <>
                <li
                  key={draggablePlace.contentid}
                  className="draggableCard"
                  draggable
                  data-content={draggablePlace.contentid}
                  data-row={index.toString()}
                  data-col={"_1"}
                  onDragStart={(e) => handleDragStart(e)}
                >
                  <PlaceCard place={draggablePlace} />
                  <span
                    className="delete"
                    onClick={() =>
                      handleDelete(draggablePlace.contentid, index)
                    }
                  >
                    <LuTrash2 />
                  </span>
                </li>
                <DropIndicator
                  key={`drop_${draggablePlace.contentid}`}
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
