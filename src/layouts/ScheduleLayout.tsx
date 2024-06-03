import React from "react";
import "./scheduleLayout.css";
import Procedure from "../pages/schedule/procedure/Procedure";
import Map from "../pages/schedule/map/Map";
import Choice from "../pages/schedule/choice/Choice";
import { useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import usePreventRefresh from "../hooks/usePreventRefresh";
import PlaceModal from "../pages/schedule/choice/places/PlaceModal";
import AccommModal from "../pages/schedule/choice/places/AccommModal";

const ScheduleLayout = () => {
  // 새로 고침 방지
  usePreventRefresh();

  // 일정 확인용(불필요)
  const schedule = useSelector((state: Rootstate) => state.schedule);
  console.log(schedule.schedule);
  const modalToggle = useSelector((state: Rootstate) => state.place.modal);
  const accommoToggle = useSelector(
    (state: Rootstate) => state.place.accomoModal
  );
  const columns = useSelector((state: Rootstate) => state.place.columns);
  console.log("컬럼들", columns);

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
