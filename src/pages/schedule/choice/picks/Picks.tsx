import React from "react";
import "./picks.css";
import Drags from "./Drags";
import Drops from "./Drops";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";

const Picks = () => {
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const columnPlace = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );
  const columnPlaces_1 = columnPlace["columnPlaces_1"];
  console.log(schedule);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 타겟의 부모요소를 찾음 - 이 경우에는 picks
    const target = e.currentTarget.parentElement;
    if (!target) return;

    const MIN_WIDTH = columnPlaces_1.length > 0 ? 741 : 530;
    const MAX_WIDTH = columnPlaces_1.length > 0 ? 1145 : 1035;
    const procedureWidth = 100;

    const resize: EventListener = (e) => {
      // picks 오른쪽 border의 거리?
      const right = target.getBoundingClientRect().right - 102;
      // 드래그 포인트의 위치
      const left = (e as MouseEvent).clientX - procedureWidth + 10;

      const width =
        left <= MIN_WIDTH
          ? MIN_WIDTH
          : left >= right && right <= MAX_WIDTH
          ? right
          : left >= MAX_WIDTH
          ? MAX_WIDTH
          : left;

      target.style.width = `${width}px`;
    };

    document.addEventListener("mousemove", resize);
    document.addEventListener(
      "mouseup",
      () => document.removeEventListener("mousemove", resize),
      { once: true }
    );
  };

  return (
    <div
      className="picks"
      style={
        columnPlaces_1 === undefined
          ? undefined
          : columnPlaces_1.length > 0
          ? { width: "741px" }
          : { width: "530px" }
      }
    >
      {columnPlaces_1.length > 0 && <Drags />}
      <Drops />
      <div className="edge" onMouseDown={(e) => handleDrag(e)}></div>
    </div>
  );
};

export default Picks;
