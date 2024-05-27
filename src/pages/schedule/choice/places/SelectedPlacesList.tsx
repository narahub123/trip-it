import React, { useEffect } from "react";
import "./selectedPlacesList.css";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  clearContentId,
  clearSelectedPlaces,
  fetchPlace,
  removeContentId,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import { contentTypeIds } from "../../../../data/contentTypeIds";
import { metros } from "../../../../data/metros";
import PlaceCard from "./PlaceCard";

const SelectedPlacesList = () => {
  const dispatch = useDispatch();
  const selectedPlaces = useSelector(
    (state: Rootstate) => state.place.selectedPlaces
  );
  const areacode = useSelector(
    (state: Rootstate) => state.schedule.schedule.metro_id || "1"
  );
  const contentIds = useSelector((state: Rootstate) => state.place.contentIds);

  // 기본 이미지
  const defaultImage = metros.find(
    (metro) => metro.areaCode === areacode
  )?.imgUrl;

  const handleDeselection = (contentId: string) => {
    dispatch(removeContentId(contentId));
    dispatch(removeSelectedPlace(contentId));
  };

  const handleReset = () => {
    dispatch(clearSelectedPlaces());
    dispatch(clearContentId());
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
