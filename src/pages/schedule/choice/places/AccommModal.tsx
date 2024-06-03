import React, { useEffect, useState } from "react";
import "./accommoModal.css";

import { useDispatch, useSelector } from "react-redux";
import {
  accommoToggle,
  addContentId,
  calcColumns,
  fetchPlace,
} from "../../../../store/slices/placeSlice";
import { Rootstate, store } from "../../../../store/store";
import { CalculateDuration } from "../../../../utils/date";
import AccommoPick from "./AccommoPick";

const AccommModal = () => {
  const [column, setColumn] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const place = useSelector((state: Rootstate) => state.place.place);
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const columns = useSelector((state: Rootstate) => state.place.columns);

  useEffect(() => {
    const isExisted = columns.findIndex((column) => column.contentId !== "");
    if (isExisted === -1) store.dispatch(calcColumns());
  }, []);

  // 일정
  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (e.currentTarget.className === "accommo-modal") {
      dispatch(accommoToggle());
    }
  };

  const handleSelection = () => {
    if (place) {
      dispatch(addContentId({ contentId: place?.contentid, column }));
      dispatch(fetchPlace({ contentId: place?.contentid, info: false }) as any);
    }
    dispatch(accommoToggle());
  };

  console.log("column", column);

  console.log("columns", columns);
  console.log("열림");

  return (
    <div className="accommo-modal" onClick={(e) => handleToggle(e)}>
      <div className="accommo-container" onClick={(e) => handleToggle(e)}>
        <div className="container">
          <div className="desc">숙박하실 날짜를 선택해주세요</div>
          <div className="accommo-title">{place?.title}</div>
          <div className="accommo-list-container">
            <ul>
              {columns.map((column) => (
                <AccommoPick
                  date={column.date}
                  index={column.column}
                  setColumn={setColumn}
                  key={column.date}
                />
              ))}
            </ul>
          </div>
          <div className="select-all">전체 선택</div>
          <div
            className="done"
            onClick={
              typeof column === "number"
                ? () => {
                    handleSelection();
                  }
                : () => dispatch(accommoToggle())
            }
          >
            {typeof column === "number" ? "완료" : "되돌가기"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommModal;
