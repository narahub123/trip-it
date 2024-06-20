import React from "react";
import "./placeModal.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { modalToggle } from "../../../../store/slices/placeSlice";
import Button from "../../../../components/ui/Button";
import { addPlaceToColumn } from "../../../../store/slices/columnPlacesSlice";
import { LuLoader } from "react-icons/lu";
import useDefaultImage from "../../../../hooks/useDefaultImage";
const PlaceModal = () => {
  // 기본이미지 가져오기
  const defaultImage = useDefaultImage();
  const place = useSelector((state: Rootstate) => state.place.place);
  const status = useSelector((state: Rootstate) => state.place.status);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(modalToggle());
  };

  const handleSelect = () => {
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
        {status === "loading" && (
          <div className="loading-container">
            <p className="loading-text">loading</p>
            <div className="loading-image">
              <LuLoader />
            </div>
          </div>
        )}
        {status === "succeeded" && (
          <>
            <div className="info">
              <p className="title">{place?.title}</p>
              <figure>
                <img
                  src={place?.firstimage || defaultImage}
                  alt={place?.title}
                  decoding="async"
                />
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
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceModal;
