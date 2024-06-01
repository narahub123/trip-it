import React from "react";
import "./picks.css";
import Drags from "./Drags";
import Drops from "./Drops";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";

const Picks = () => {
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);

  console.log(schedule);

  return (
    <div className="picks">
      <Drags />
      <Drops />
    </div>
  );
};

export default Picks;
