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

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 타겟의 부모요소를 찾음 - 이 경우에는 picks
    const target = e.currentTarget.parentElement;
    if (!target) return;

    const widthRefWidth = widthRef.current?.getBoundingClientRect().width;
    console.log(widthRefWidth);

    const MIN_WIDTH = columnPlaces_1.length > 0 ? 741 : 430;
    const MAX_WIDTH = columnPlaces_1.length > 0 ? 1145 : 1035;
    const procedureWidth = 100;

    console.log(widthRef.current?.offsetWidth);

    console.log(MIN_WIDTH);
    console.log(MAX_WIDTH);

    const resize: EventListener = (e) => {
      console.log("mousedown");

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
      setWidth(width);
    };

    document.addEventListener("mousemove", resize);

    if (width && width < MIN_WIDTH) {
      document.removeEventListener("mousemove", resize);
    }
    if (width && width > MAX_WIDTH) {
      document.removeEventListener("mousemove", resize);
    }
    document.addEventListener(
      "mouseup",
      () => {
        console.log("mouseup");

        document.removeEventListener("mousemove", resize);
      },
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
          : { width: "430px" }
      }
      ref={widthRef}
    >
      {columnPlaces_1.length > 0 && <Drags />}
      <Drops />
      <div className="edge" onMouseDown={(e) => handleDrag(e)}></div>
    </div>
  );
};

export default Picks;
