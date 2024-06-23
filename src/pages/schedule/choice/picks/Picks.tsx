import React, { useRef, useState } from "react";
import "./picks.css";
import Drags from "./Drags";
import Drops from "./Drops";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";

const Picks = () => {
  const widthRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(widthRef.current?.offsetWidth);
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const columnPlace = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );
  const columnPlaces_1 = columnPlace["columnPlaces_1"];
  console.log(schedule);

  return (
    <div className="picks">
      {columnPlaces_1.length > 0 && <Drags />}
      <Drops />
    </div>
  );
};

export default Picks;
