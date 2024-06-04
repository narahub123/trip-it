import React from "react";
import "./placeModal.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { fetchPlace, modalToggle } from "../../../../store/slices/placeSlice";
const PlaceModal = () => {
  const place = useSelector((state: Rootstate) => state.place.place);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(modalToggle());
  };

  const handleSelect = (contentId: string) => {
    dispatch(fetchPlace({ contentId, info: false }) as any);
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
          <button onClick={place && (() => handleSelect(place?.contentid))}>
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
