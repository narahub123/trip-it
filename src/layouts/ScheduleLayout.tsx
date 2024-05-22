import React from "react";
import "./scheduleLayout.css";
import Procedure from "../pages/schedule/procedure/Procedure";
import Map from "../pages/schedule/map/Map";
import Choice from "../pages/schedule/choice/Choice";

const ScheduleLayout = () => {
  return (
    <div className="scheduleLayout">
      <Procedure />
      <Choice />
      <Map />
    </div>
  );
};

export default ScheduleLayout;
