import React, { useEffect } from "react";
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

const ScheduleLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const backToggle = useSelector((state: Rootstate) => state.ui.BackToggle);

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

  const modalToggle = useSelector((state: Rootstate) => state.place.modal);
  const accommoToggle = useSelector(
    (state: Rootstate) => state.place.accomoModal
  );

  return (
    <div className="scheduleLayout">
      {accommoToggle && <AccommModal />}
      {modalToggle && <PlaceModal />}
      {backToggle && <BackModal />}
      <Procedure />
      <Choice />
      <Map />
    </div>
  );
};

export default ScheduleLayout;
