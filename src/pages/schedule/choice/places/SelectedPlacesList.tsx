import React, { useEffect } from "react";
import "./selectedPlacesList.css";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { removeSelectedPlace } from "../../../../store/slices/placeSlice";

import PlaceCard from "./PlaceCard";
import {
  clearColumnPlaces_1,
  removePlaceFromColumnPlaces_1,
} from "../../../../store/slices/columnPlacesSlice";
// import { fetchSelectedPlaces } from "../../../../store/slices/columnPlacesSlice";

const SelectedPlacesList = () => {
  const dispatch = useDispatch();

  const columnPlaces_1 = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces[`columnPlaces_1`]
  );

  const numOfSavedPlaces = columnPlaces_1.length;

  const handleDeselection = (contentId: string) => {
    // selectedPlaces에서 삭제
    dispatch(removeSelectedPlace(contentId));
    // columnPlaces_1에서 삭제
    dispatch(removePlaceFromColumnPlaces_1(contentId));
  };

  const handleReset = () => {
    if (!window.confirm("선택한 장소들을 초기화하시겠습니까?")) {
      return;
    }
    dispatch(clearColumnPlaces_1());
  };

  console.log("columnPlaces_1", columnPlaces_1);

  return (
    <div className="selectedPlacesList">
      <div className="listInfo">
        <p className="count">{numOfSavedPlaces || 0}</p>
        <p className="reset" onClick={handleReset}>
          장소 설정 초기화
        </p>
      </div>
      <div className="selectedList">
        {(numOfSavedPlaces === 0 || !columnPlaces_1) && (
          <div className="indicator">장소를 선택해주세요.</div>
        )}
        <ul>
          {columnPlaces_1 &&
            numOfSavedPlaces > 0 &&
            columnPlaces_1.map((place, index) => (
              <li key={place.contentid}>
                <span className="index">
                  <p>{index + 1}</p>
                </span>
                <PlaceCard place={place} />
                <span
                  className="delete"
                  onClick={() => handleDeselection(place.contentid)}
                >
                  <LuTrash2 />
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedPlacesList;
