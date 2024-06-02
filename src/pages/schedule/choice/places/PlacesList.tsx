import React, { useCallback, useEffect, useRef, useState } from "react";
import "./placesList.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  accommoToggle,
  addContentId,
  addPageNo,
  clearPageNo,
  clearPlaces,
  fetchPlace,
  fetchPlaces,
  fetchSearchedPlaces,
  removeContentId,
  removeSelectedPlace,
} from "../../../../store/slices/placeSlice";
import { metros } from "../../../../data/metros";
import { dateMidFormatter, destrucDate, getWeek } from "../../../../utils/date";
import { LuLoader } from "react-icons/lu";

import PlaceCard from "./PlaceCard";
import { isSearchable } from "../../../../data/hangul";
import { debounce } from "../../../../utils/debounce";
import { useRenderCount } from "@uidotdev/usehooks";

const PlacesList = () => {
  // 렌더링 개수
  const count = useRenderCount();
  const listRef = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const places = useSelector((state: Rootstate) => state.place.places);
  const status = useSelector((state: Rootstate) => state.place.status);
  const pageNo = useSelector((state: Rootstate) => state.place.pageNo);
  const isEnd = useSelector((state: Rootstate) => state.place.isEnd);
  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const location = useLocation();
  const { hash } = location;

  const [contentTypeId, setContentTypeId] = useState("1");
  const [keyword, setKeyword] = useState("");

  // 해시나 종류가 달라지는 경우 기존 places를 비움
  useEffect(() => {
    console.log("셋팅 호출됨");
    // 스크롤 위치를 target보다 높게 설정
    listRef.current &&
      listRef.current.scroll({
        top: 0,
        behavior: "auto",
      });

    // 기존 목록을 비움
    dispatch(clearPlaces());
  }, [hash, contentTypeId, keyword]);

  // 목록
  useEffect(() => {
    if (keyword !== "") {
      console.log("검색이 호출됨");
      dispatch(
        fetchSearchedPlaces({ keyword, hash, contentTypeId, pageNo }) as any
      );
    } else {
      console.log("목록 호출됨", contentTypeId);
      dispatch(fetchPlaces({ hash, contentTypeId, pageNo }) as any);
    }
  }, [hash, contentTypeId, pageNo, keyword]);

  // 검색
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    isSearchable(keyword) && setKeyword(keyword);
    console.log("검색어 설정 완료");

    // setPageNo(1);
    dispatch(clearPageNo());
  };

  const debounceOnChange = debounce<typeof onChange>(onChange, 500);

  // 무한 스크롤링
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("만남");
          // setPageNo((prev) => prev + 1);
          dispatch(addPageNo());
        }
      });
    });

    target.current && observer.observe(target.current);

    return () => {
      target.current && observer.unobserve(target.current);
    };
  }, [isEnd]);

  console.log(`----- 렌더링 횟수 ${count} -----`);

  console.log(keyword);
  console.log("contentTypeId", contentTypeId);
  console.log("pageNo", pageNo);

  console.log("isend", isEnd);
  console.log("--------------------------");
  // 장소 추가하기
  const contentIds = useSelector((state: Rootstate) => state.place.contentIds);

  const handleSelection = (contentId: string, contentTypeId: string) => {
    if (contentTypeId == "32") {
      dispatch(accommoToggle());
      dispatch(fetchPlace({ contentId, info: true }) as any);
      return;
    }
    console.log(contentId);
    dispatch(addContentId({ contentId }));
    dispatch(fetchPlace({ contentId, info: false }) as any);
  };

  const handleDeselection = (contentId: string, contentTypeId: string) => {
    dispatch(removeContentId(contentId));
    dispatch(removeSelectedPlace(contentId));
  };

  // 일정
  const start =
    schedule.start_date &&
    destrucDate(dateMidFormatter(new Date(schedule.start_date)));
  const end =
    schedule.end_date &&
    destrucDate(dateMidFormatter(new Date(schedule.end_date)));

  // 카테고리 변경하기
  const handleClick = (contentTypeId: string) => {
    console.log("카테고리 변경");

    setContentTypeId(contentTypeId);
    // setPageNo(1);
    dispatch(clearPageNo());
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
        <input
          id="search"
          name="name"
          type="text"
          placeholder="장소명을 입력하세요"
          onChange={debounceOnChange}
        />
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
          {places
            ? places.map((place) => (
                <li className="placeListCard" key={place.contentid}>
                  <span className="placeInfo">
                    <PlaceCard place={place} />
                  </span>
                  {!contentIds?.find(
                    (contentId) => contentId.contentId === place.contentid
                  ) ? (
                    <span
                      className="placeEvent"
                      onClick={() =>
                        handleSelection(place.contentid, place.contenttypeid)
                      }
                    >
                      <p className="btn">+</p>
                    </span>
                  ) : (
                    <span
                      className="placeEventActive"
                      onClick={() =>
                        handleDeselection(place.contentid, place.contenttypeid)
                      }
                    >
                      <p className="btn">🗸</p>
                    </span>
                  )}
                </li>
              ))
            : status !== "loading" && (
                <li className="warning">데이터 연결 실패</li>
              )}
          {status === "loading" && (
            <li key={"loading"} className="loading">
              <LuLoader />
            </li>
          )}
        </ul>
        {!isEnd && (
          <div key={"target"} ref={target} style={{ textAlign: "center" }}>
            장소 더 불러오기
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesList;
