import React, { useEffect } from "react";
import "./selectedPlacesList.css";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  clearSelectedPlaces,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";

import PlaceCard from "./PlaceCard";
import { removePlaceFromColumnPlaces_1 } from "../../../../store/slices/columnPlacesSlice";
// import { fetchSelectedPlaces } from "../../../../store/slices/columnPlacesSlice";

const SelectedPlacesList = () => {
  const dispatch = useDispatch();
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );

  const handleDeselection = (contentId: string) => {
    // selectedPlaces에서 삭제
    dispatch(removeSelectedPlace(contentId));
    // columnPlaces_1에서 삭제
    dispatch(removePlaceFromColumnPlaces_1(contentId));
  };

  const handleReset = () => {
    dispatch(clearSelectedPlaces());
  };
  console.log("selectedPlaces", selectedPlaces);

  return (
    <div className="selectedPlacesList">
      <div className="listInfo">
        <p className="count">{selectedPlaces?.length || 0}</p>
        <p className="reset" onClick={handleReset}>
          장소 설정 초기화
        </p>
      </div>
      <div className="selectedList">
        {(selectedPlaces?.length === 0 || !selectedPlaces) && (
          <div className="indicator">장소를 선택해주세요.</div>
        )}
        <ul>
          {selectedPlaces &&
            selectedPlaces?.length > 0 &&
            selectedPlaces.map((place, index) => (
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
