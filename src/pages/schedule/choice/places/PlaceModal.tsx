import React from "react";
import "./placeModal.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  addSelectedPlace,
  modalToggle,
} from "../../../../store/slices/placeSlice";
const PlaceModal = () => {
  const place = useSelector((state: Rootstate) => state.place.place);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(modalToggle());
  };

  const handleSelect = () => {
    place && dispatch(addSelectedPlace(place));
  };
  return (
    <div
      className="placeModal"
      onClick={() => {
        handleToggle();
      }}
    >
      <div className="container">
        <div className="info">
          <p className="title">{place?.title}</p>
          <figure>
            <img src={place?.firstimage} alt={place?.title} />
          </figure>
          <p className="desc">{place?.overview}</p>
        </div>
        <div className="buttons">
          {place?.contenttypeid !== "32" && (
            <button onClick={place && (() => handleSelect())}>선택</button>
          )}
          {place?.contenttypeid === "32" && <></>}
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
