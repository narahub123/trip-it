import React, { useCallback, useEffect, useRef, useState } from "react";
import "./placesList.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { clearPlaces, fetchPlaces } from "../../../../store/slices/placeSlice";
import { metros } from "../../../../data/metros";
import { dateMidFormatter, destrucDate, getWeek } from "../../../../utils/date";
import { contentTypeIds } from "../../../../data/contentTypeIds";
import { LuRefreshCcw } from "react-icons/lu";

const PlacesList = () => {
  const [contentTypeId, setContentTypeId] = useState("1");
  const [pageNo, setPageNo] = useState(0);
  const target = useRef<HTMLLIElement>(null);
  const [isFirst, setIsFirst] = useState(true);
  const [isEnd, setIsEnd] = useState<boolean>(false); // 불러온 데이터 NumberOfRow보다 작은 경우 end로 변경하는 것 추가 필요
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const places = useSelector((state: Rootstate) => state.place.places);
  const status = useSelector((state: Rootstate) => state.place.status);
  const areacode =
    useSelector((state: Rootstate) => state.schedule.schedule.metro_id) || "1";
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const location = useLocation();
  const { hash } = location;

  // 해시나 종류가 달라지는 경우 기존 places를 비움
  useEffect(() => {
    dispatch(clearPlaces());
  }, [hash, contentTypeId]);
  useEffect(() => {
    setCount((pre) => pre + 1);
    if (pageNo === 0) return;

    dispatch(fetchPlaces({ hash, contentTypeId, pageNo }) as any);
  }, [dispatch, hash, contentTypeId, pageNo]);

  const start =
    schedule.start_date &&
    destrucDate(dateMidFormatter(new Date(schedule.start_date)));
  const end =
    schedule.end_date &&
    destrucDate(dateMidFormatter(new Date(schedule.end_date)));

  // 무한 스크롤
  useEffect(() => {
    let options = {
      root: document.querySelector("body"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver((items) => {
      if (isFirst) {
        setIsFirst(false);
        return;
      }
      items.forEach((item) => {
        if (item.isIntersecting) {
          console.log(item);
          setPageNo((prev) => prev + 1);
        }
      });
    }, options);

    console.log(pageNo);
    console.log("count", count);

    console.log(target, "visible");

    target.current && observer.observe(target.current);
    return () => {
      target.current && observer.unobserve(target.current);
    };
  }, [isFirst]);

  const defaultImage = metros.find(
    (metro) => metro.areaCode === areacode
  )?.imgUrl;

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
      <div className="search">
        <input type="search" placeholder="장소명을 입력하세요" />
      </div>
      <div className="category">
        {hash === "#step2" ? (
          <ul>
            <li
              className={contentTypeId === "1" ? "active" : ""}
              key={1}
              onClick={() => setContentTypeId("1")}
            >
              전체
            </li>
            <li
              className={contentTypeId === "12" ? "active" : ""}
              key={12}
              onClick={() => setContentTypeId("12")}
            >
              관광
            </li>
            <li
              className={contentTypeId === "14" ? "active" : ""}
              key={14}
              onClick={() => setContentTypeId("14")}
            >
              문화
            </li>
            <li
              className={contentTypeId === "39" ? "active" : ""}
              key={39}
              onClick={() => setContentTypeId("39")}
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
      <div className="list">
        <ul className="listContainer" id="listContainer">
          {status === "loading" && (
            <li key={"loading"} className="loading">
              <LuRefreshCcw />
            </li>
          )}
          {places
            ? places.map((place) => (
                <li className="placeCard" key={place.contentid}>
                  <span className="placeInfo">
                    <figure className="photo">
                      <img
                        src={place.firstimage || defaultImage}
                        alt={place.title}
                      />
                    </figure>
                    <span className="info">
                      <div className="placeName">
                        <p>{place.title}</p>
                      </div>
                      <div className="addrContainer">
                        <span
                          className="type"
                          style={
                            place.contenttypeid === "12"
                              ? { color: "red" }
                              : place.contenttypeid === "14"
                              ? { color: "blue" }
                              : place.contenttypeid === "32"
                              ? { color: "violet" }
                              : place.contenttypeid === "39"
                              ? { color: "green" }
                              : {}
                          }
                        >
                          {contentTypeIds[Number(place.contenttypeid)]}
                        </span>
                        <span className="addr">{place.addr1}</span>
                      </div>
                    </span>
                  </span>
                  <span className="placeEvent">
                    <p className="btn">+</p>
                  </span>
                </li>
              ))
            : status !== "loading" && (
                <li className="warning">데이터 연결 실패</li>
              )}
          {!isEnd && (
            <li key={"target"} ref={target} style={{ visibility: "hidden" }}>
              target
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PlacesList;
