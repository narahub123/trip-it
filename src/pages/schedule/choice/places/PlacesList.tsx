import React, { useCallback, useEffect, useRef, useState } from "react";
import "./placesList.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  addContentId,
  clearPlaces,
  fetchPlace,
  fetchPlaces,
  removeContentId,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import { metros } from "../../../../data/metros";
import { dateMidFormatter, destrucDate, getWeek } from "../../../../utils/date";
import { LuRefreshCcw } from "react-icons/lu";

import PlaceCard from "./PlaceCard";

const PlacesList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const places = useSelector((state: Rootstate) => state.place.places);
  const status = useSelector((state: Rootstate) => state.place.status);
  const isEnd = useSelector((state: Rootstate) => state.place.isEnd);
  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const location = useLocation();
  const { hash } = location;

  const [pageNo, setPageNo] = useState(1);
  const [contentTypeId, setContentTypeId] = useState("1");

  // 해시나 종류가 달라지는 경우 기존 places를 비움
  useEffect(() => {
    console.log("셋팅 호출됨");

    dispatch(clearPlaces());
    setPageNo(1);
  }, [hash, contentTypeId]);

  // 목록
  useEffect(() => {
    dispatch(fetchPlaces({ hash, contentTypeId, pageNo }) as any);

    console.log("목록 호출됨", contentTypeId);
  }, [hash, contentTypeId, pageNo]);

  // 무한 스크롤링
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("만남");
          setPageNo((prev) => prev + 1);
        }
      });
    });

    target.current && observer.observe(target.current);

    return () => {
      target.current && observer.unobserve(target.current);
    };
  }, []);

  console.log("contentTypeId", contentTypeId);
  console.log("pageNo", pageNo);

  console.log("isend", isEnd);

  // 장소 추가하기
  const contentIds = useSelector((state: Rootstate) => state.place.contentIds);

  const handleSelection = (contentId: string) => {
    console.log(contentId);
    dispatch(addContentId(contentId));
    dispatch(fetchPlace({ contentId, info: false }) as any);
  };

  const handleDeselection = (contentId: string) => {
    dispatch(removeContentId(contentId));
    dispatch(removeSelectedPlace(contentId));
  };

  // 날짜
  const start =
    schedule.start_date &&
    destrucDate(dateMidFormatter(new Date(schedule.start_date)));
  const end =
    schedule.end_date &&
    destrucDate(dateMidFormatter(new Date(schedule.end_date)));

  // 카테고리 변경하기
  const handleClick = (contentTypeId: string) => {
    listRef.current &&
      listRef.current.scroll({
        top: 0,
        behavior: "auto",
      });
    setContentTypeId(contentTypeId);
    setPageNo(1);
  };

  return (
    <div className="placesList">
      <div className="info">
        <p className="areaName">
          {metros.find((metro) => metro.areaCode === areacode)?.name}
        </p>
        <p className="duration">
          {start &&
            schedule.start_date &&
            end &&
            schedule.end_date &&
            `${start.year}.${start.month + 1}.${start.date}(${getWeek(
              new Date(schedule.start_date)
            )}) - ${end.year}.${end.month + 1}.${end.date}(${getWeek(
              new Date(schedule.end_date)
            )})`}
        </p>
      </div>
      <div className="place-search-container">
        <form>
          <input
            id="search"
            name="name"
            type="search"
            placeholder="장소명을 입력하세요"
          />
        </form>
      </div>
      <div className="category">
        {hash === "#step2" ? (
          <ul>
            <li
              className={contentTypeId === "1" ? "active" : ""}
              key={1}
              onClick={() => handleClick("1")}
            >
              전체
            </li>
            <li
              className={contentTypeId === "12" ? "active" : ""}
              key={12}
              onClick={() => handleClick("12")}
            >
              관광
            </li>
            <li
              className={contentTypeId === "14" ? "active" : ""}
              key={14}
              onClick={() => handleClick("14")}
            >
              문화
            </li>
            <li
              className={contentTypeId === "39" ? "active" : ""}
              key={39}
              onClick={() => handleClick("39")}
            >
              식당
            </li>
          </ul>
        ) : (
          <ul>
            <li className="active">숙소</li>
          </ul>
        )}
      </div>
      <div className="list" ref={listRef}>
        <ul className="listContainer" id="listContainer">
          {status === "loading" && (
            <li key={"loading"} className="loading">
              <LuRefreshCcw />
            </li>
          )}
          {places
            ? places.map((place) => (
                <li className="placeListCard" key={place.contentid}>
                  <span className="placeInfo">
                    <PlaceCard place={place} />
                  </span>
                  {!contentIds?.find(
                    (contentId) => contentId === place.contentid
                  ) ? (
                    <span
                      className="placeEvent"
                      onClick={() => handleSelection(place.contentid)}
                    >
                      <p className="btn">+</p>
                    </span>
                  ) : (
                    <span
                      className="placeEventActive"
                      onClick={() => handleDeselection(place.contentid)}
                    >
                      <p className="btn">🗸</p>
                    </span>
                  )}
                </li>
              ))
            : status !== "loading" && (
                <li className="warning">데이터 연결 실패</li>
              )}
        </ul>
        {!isEnd && (
          <div key={"target"} ref={target}>
            target
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesList;
