import React from "react";
import "./placeModal.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { modalToggle } from "../../../../store/slices/placeSlice";
import Button from "../../../../components/ui/Button";
import { addPlaceToColumn } from "../../../../store/slices/columnPlacesSlice";
import { LuLoader } from "react-icons/lu";
import useDefaultImage from "../../../../hooks/useDefaultImage";
import useLoadedImage from "../../../../hooks/useLoadedImage";
const PlaceModal = () => {
  const dispatch = useDispatch();
  // 기본이미지 가져오기
  const defaultImage = useDefaultImage();
  // 선택한 장소
  const place = useSelector((state: Rootstate) => state.place.place);
  // 데이터 상태 확인
  const status = useSelector((state: Rootstate) => state.place.status);
  // 이미지 로딩
  const imgLoaded = useLoadedImage(place);

  // 모달창 열고 닫기
  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const classname = e.currentTarget.className;

    if (classname === "placeModal") {
      dispatch(modalToggle());
    }
  };

  // 해당 장소 선택하기
  const handleSelect = () => {
    place && dispatch(addPlaceToColumn({ column: "_1", place, order: -1 }));
  };

  // esc 키를 누른 경우 모달창 닫기
  const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      dispatch(modalToggle());
    }
  };

  return (
    <div
      className="placeModal"
      onClick={(e) => {
        handleToggle(e);
      }}
      tabIndex={0}
      onKeyDown={(e) => handleEscape(e)}
    >
      <div
        className="container"
        onClick={(e) => {
          handleToggle(e);
        }}
      >
        {/* api 데이터 로딩 처리 */}
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
                {/* 이미지 로딩 처리 */}
                {imgLoaded ? (
                  <img
                    src={place?.firstimage || defaultImage}
                    alt={place?.title}
                    decoding="async"
                  />
                ) : (
                  <img src="/images/trip-it-logo.png" alt="Loading..." />
                )}
              </figure>
              <p className="desc">{place?.overview}</p>
            </div>
            <div className="buttons">
              {place?.contenttypeid !== "32" && (
                <div onClick={place && (() => handleSelect())}>
                  <Button name="추가" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceModal;
