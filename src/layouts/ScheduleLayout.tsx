import React, { useEffect, useRef, useState } from "react";
import "./scheduleLayout.css";
import Procedure from "../pages/schedule/procedure/Procedure";
import Map from "../pages/schedule/map/Map";
import Choice from "../pages/schedule/choice/Choice";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import usePreventRefresh from "../hooks/usePreventRefresh";
import PlaceModal from "../pages/schedule/choice/places/PlaceModal";
import AccommModal from "../pages/schedule/choice/places/AccommModal";
import { useLocation, useNavigate } from "react-router-dom";
import BackModal from "../pages/schedule/BackModal";
import { setBackToggle } from "../store/slices/uiSlice";
import { useRenderCount } from "@uidotdev/usehooks";
import MapTest from "../pages/schedule/map/MapTest";
import { debounce } from "../utils/debounce";
import { setMapWidth } from "../store/slices/mapSlice";

const ScheduleLayout = () => {
  const scheduleLayoutRef = useRef<HTMLDivElement>(null);
  const [scheduleLayoutWidth, setScheduleLayoutWidth] = useState(0);
  const rendering = useRenderCount();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hash, pathname } = useLocation();
  const backToggle = useSelector((state: Rootstate) => state.ui.BackToggle);
  const columnPlaces = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );

  const divisionPoint = 751;

  // console.log("렌더링 횟수", rendering);

  // scheduleLayout 너비 구하기: ref 이용
  useEffect(() => {
    const handleScheduleLayoutResize = debounce(() => {
      if (!scheduleLayoutRef.current) return;

      const width = scheduleLayoutRef.current.getBoundingClientRect().width;

      setScheduleLayoutWidth(width);
    }, 500);

    handleScheduleLayoutResize();

    window.addEventListener("resize", handleScheduleLayoutResize);
    return () => {
      window.removeEventListener("resize", handleScheduleLayoutResize);
    };
  }, [scheduleLayoutRef]);

  // choice와 map 너비 구하기
  useEffect(() => {
    if (!scheduleLayoutRef.current) return;

    // choice와 map을 찾기 위해서 dom children 사용
    const choice = scheduleLayoutRef.current.children[1] as HTMLElement;
    const map = scheduleLayoutRef.current.children[3] as HTMLElement;

    if (!choice || !map) return;

    dispatch(setMapWidth(map.getBoundingClientRect().width));
    // console.log("레이아웃 너비", scheduleLayoutWidth);
    // console.log("choice 너비", choice.getBoundingClientRect().width);
    // console.log("map 너비", map.getBoundingClientRect().width);

    if (scheduleLayoutWidth < divisionPoint) {
      choice.style.width = `${scheduleLayoutWidth - 130}px`;
      // picks.style.width = `${scheduleLayoutWidth - 130}px`; // 왜 100이 아니라 130일까?
      map.style.setProperty("width", "0px");
    } else {
      choice.style.width = `${divisionPoint}px`;
      map.style.setProperty(
        "width",
        `${scheduleLayoutWidth - divisionPoint}px`
      );
    }
  }, [scheduleLayoutWidth]);

  // console.log("레이아웃 너비", scheduleLayoutWidth);

  // 새로 고침 방지
  usePreventRefresh();

  useEffect(() => {
    const redirect = localStorage.getItem("redirect");

    if (redirect === "true") {
      localStorage.setItem("redirect", "false");
      // 새로고침을 하는 경우 이동 경로
      const pathnameDecoded = decodeURI(pathname);
      navigate(`${pathnameDecoded}#step1`);
    }
  }, []);

  // 뒤로가기 방지
  const preventGoBack = () => {
    dispatch(setBackToggle());
  };

  useEffect(() => {
    const handleHashChange = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("hashchange", handleHashChange);

    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [hash]);

  const modalToggle = useSelector((state: Rootstate) => state.place.modal);
  const accommoToggle = useSelector(
    (state: Rootstate) => state.place.accomoModal
  );

  const handleResize = debounce(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!scheduleLayoutRef.current) return;
      // choice와 map을 찾기 위해서 dom children 사용
      const choice = scheduleLayoutRef.current.children[1] as HTMLElement;
      const picks = choice.children[0] as HTMLElement;
      const map = scheduleLayoutRef.current.children[3] as HTMLElement;

      // console.log(picks);

      // choice의 너비
      const choiceWidth = choice.getBoundingClientRect().width;

      // 최초 위치 저장
      const initialX = e.clientX;
      // console.log("최초 위치", initialX);

      const resize = (e: MouseEvent) => {
        // 이동거리
        const deltaX = e.clientX - initialX - 20;

        // choice의 최소 최대 너비
        const MIN_WIDTH = 400;
        const MAX_WIDTH =
          scheduleLayoutWidth < divisionPoint
            ? divisionPoint
            : scheduleLayoutWidth - 130; // 20차이는 choice의 padding 때문임

        // choice의 새로운 너비
        let newWidth =
          choiceWidth + deltaX < MIN_WIDTH
            ? MIN_WIDTH
            : choiceWidth + deltaX > MAX_WIDTH
            ? MAX_WIDTH
            : choiceWidth + deltaX;

        // console.log("이동거리", deltaX);
        // console.log("최대너비", MAX_WIDTH);
        // console.log("새로운 choice 너비", newWidth);
        // console.log("map", scheduleLayoutWidth - newWidth - 130);

        choice.style.width = `${newWidth}px`;
        map.style.setProperty(
          "width",
          `${scheduleLayoutWidth - newWidth - 130}px`
        );
        dispatch(setMapWidth(scheduleLayoutWidth - newWidth - 130));
      };

      // 마우스 이동 이벤트
      document.addEventListener("mousemove", resize);

      // 마우스 이벤트 종료
      document.addEventListener(
        "mouseup",
        () => {
          // console.log("mouseup");

          document.removeEventListener("mousemove", resize);
        },
        { once: true }
      );
    },
    500
  );

  return (
    <div className="scheduleLayout" ref={scheduleLayoutRef}>
      {accommoToggle && <AccommModal />}
      {modalToggle && <PlaceModal />}
      {backToggle && <BackModal />}
      <Procedure />
      <Choice />
      {/* <Map /> */}

      <div
        className="edge"
        onMouseDown={(e) => {
          handleResize(e);
        }}
      />

      <MapTest />
    </div>
  );
};

export default ScheduleLayout;
