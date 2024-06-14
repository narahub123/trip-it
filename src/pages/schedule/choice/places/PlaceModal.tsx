import React from "react";
import "./placeModal.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  addSelectedPlace,
  modalToggle,
} from "../../../../store/slices/placeSlice";
import Button from "../../../../components/ui/Button";
import { addPlaceToColumn } from "../../../../store/slices/columnPlacesSlice";
const PlaceModal = () => {
  const place = useSelector((state: Rootstate) => state.place.place);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(modalToggle());
  };

  const handleSelect = () => {
    // place && dispatch(addSelectedPlace(place));
    place && dispatch(addPlaceToColumn({ column: "_1", place, order: -1 }));
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
            <div onClick={place && (() => handleSelect())}>
              <Button name="추가" />
            </div>
          )}
          {place?.contenttypeid === "32" && <></>}
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
