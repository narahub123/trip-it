import React from "react";
import "./selectedPlacesList.css";
import { LuTrash2 } from "react-icons/lu";

const SelectedPlacesList = () => {
  return (
    <div className="selectedPlacesList">
      <div className="listInfo">
        <p className="count">1</p>
        <p className="reset">장소 설정 초기화</p>
      </div>
      <div className="selectedList">
        <div className="indicator">장소를 선택해주세요.</div>
        <ul>
          <li>
            <span className="index">
              <p>1</p>
            </span>
            <span className="infoContainer">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="name">꼬스덴뇨</p>
                <div className="detail">
                  <p className="category">카페</p>
                  <p className="addr">대한민국 제주특별시</p>
                </div>
              </span>
            </span>
            <span className="delete">
              <LuTrash2 />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SelectedPlacesList;
