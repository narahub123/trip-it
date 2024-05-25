import React from "react";
import "./scheduleLayout.css";
import Procedure from "../pages/schedule/procedure/Procedure";
import Map from "../pages/schedule/map/Map";
import Choice from "../pages/schedule/choice/Choice";
import { useSelector } from "react-redux";
import { Rootstate } from "../store/store";
import usePreventRefresh from "../hooks/usePreventRefresh";

const ScheduleLayout = () => {
  // 새로 고침 방지
  usePreventRefresh();

  // 일정 확인용(불필요)
  const schedule = useSelector((state: Rootstate) => state.schedule);
  console.log(schedule.schedule);

  return (
    <div className="scheduleLayout">
      <Procedure />
      <Choice />
      <Map />
    </div>
  );
};

export default ScheduleLayout;
