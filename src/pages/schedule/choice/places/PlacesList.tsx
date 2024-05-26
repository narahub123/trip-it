import React from "react";
import "./placesList.css";
import { useLocation } from "react-router-dom";

const PlacesList = () => {
  const location = useLocation();
  const { hash } = location;

  return (
    <div className="placesList">
      <div className="info">
        <p className="areaName">어디</p>
        <p className="duration">2024.05.26(일) - 2024.05.27(월)</p>
      </div>
      <div className="search">
        <input type="search" placeholder="장소명을 입력하세요" />
      </div>
      <div className="category">
        {hash === "#step2" ? (
          <ul>
            <li className="active">전체</li>
            <li>관광</li>
            <li>문화</li>
            <li>식당</li>
          </ul>
        ) : (
          <ul>
            <li className="active">숙소</li>
          </ul>
        )}
      </div>
      <div className="list">
        <ul className="listContainer">
          <li className="placeCard">
            <span className="placeInfo">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="placeName">섭지코지</p>
                <span className="type">관광</span>
                <span className="addr">대한민국 제주특별자치도</span>
              </span>
            </span>
            <span className="placeEvent">
              <p className="btn">+</p>
            </span>
          </li>
          <li className="placeCard">
            <span className="placeInfo">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="placeName">섭지코지</p>
                <span className="type">관광</span>
                <span className="addr">대한민국 제주특별자치도</span>
              </span>
            </span>
            <span className="placeEvent">
              <p className="btn">+</p>
            </span>
          </li>
          <li className="placeCard">
            <span className="placeInfo">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="placeName">섭지코지</p>
                <span className="type">관광</span>
                <span className="addr">대한민국 제주특별자치도</span>
              </span>
            </span>
            <span className="placeEvent">
              <p className="btn">+</p>
            </span>
          </li>
          <li className="placeCard">
            <span className="placeInfo">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="placeName">섭지코지</p>
                <span className="type">관광</span>
                <span className="addr">대한민국 제주특별자치도</span>
              </span>
            </span>
            <span className="placeEvent">
              <p className="btn">+</p>
            </span>
          </li>
          <li className="placeCard">
            <span className="placeInfo">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="placeName">섭지코지</p>
                <span className="type">관광</span>
                <span className="addr">대한민국 제주특별자치도</span>
              </span>
            </span>
            <span className="placeEvent">
              <p className="btn">+</p>
            </span>
          </li>
          <li className="placeCard">
            <span className="placeInfo">
              <figure className="photo">
                <img src="" alt="사진" />
              </figure>
              <span className="info">
                <p className="placeName">섭지코지</p>
                <span className="type">관광</span>
                <span className="addr">대한민국 제주특별자치도</span>
              </span>
            </span>
            <span className="placeEvent">
              <p className="btn">+</p>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlacesList;
