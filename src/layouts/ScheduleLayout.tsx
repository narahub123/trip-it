import React, { useEffect } from "react";
import "./scheduleLayout.css";
import Procedure from "../pages/schedule/procedure/Procedure";
import Map from "../pages/schedule/map/Map";
import Choice from "../pages/schedule/choice/Choice";
import { useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import usePreventRefresh from "../hooks/usePreventRefresh";
import PlaceModal from "../pages/schedule/choice/places/PlaceModal";
import AccommModal from "../pages/schedule/choice/places/AccommModal";
import { useNavigate } from "react-router-dom";

const ScheduleLayout = () => {
  const navigate = useNavigate();
  // 새로 고침 방지
  usePreventRefresh();

  useEffect(() => {
    const redirect = localStorage.getItem("redirect");

    if (redirect === "true") {
      localStorage.setItem("redirect", "false");
      navigate("/");
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
      <Procedure />
      <Choice />
      <Map />
    </div>
  );
};

export default ScheduleLayout;
