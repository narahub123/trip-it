import React from "react";
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

const Drags = () => {
  const dispatch = useDispatch();
  const draggablePlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );

  // 장소 삭제
  const handleDelete = (contentId: string) => {
    dispatch(removeSelectedPlace(contentId));
    dispatch(removeContentId(contentId));
  };

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const xRow = e.currentTarget.dataset.row;
    const xCol = e.currentTarget.dataset.col;

    e.dataTransfer.setData("xRow-xCol", xRow + "-" + xCol);

    console.log("xRow", xRow);
    console.log("xcol", xCol);
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
    const curRow = e.currentTarget.dataset.row;
    const curCol = e.currentTarget.dataset.col;

    const receievedData = e.dataTransfer.getData("xRow-xCol").split("-");
    const xRow = receievedData[0];
    const xCol = receievedData[1];
    console.log("xRow", xRow);
    console.log("xCol", xCol);
    console.log("curRow", curRow);
    console.log("curCol", curCol);
    console.log(receievedData);

    console.log("drop");
  };
  return (
    <div className="dragColumn">
      <div className="picksIntro">
        <p>저장된 장소들</p>
      </div>
      <div className="draggablePlacesList">
        {(draggablePlaces?.length === 0 || !draggablePlaces) && (
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
          {draggablePlaces &&
            draggablePlaces.length > 0 &&
            draggablePlaces.map((draggablePlace) => (
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
