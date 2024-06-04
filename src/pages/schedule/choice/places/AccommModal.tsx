import React, { useEffect, useState } from "react";
import "./accommoModal.css";

import { useDispatch, useSelector } from "react-redux";
import { accommoToggle, fetchPlace } from "../../../../store/slices/placeSlice";
import { Rootstate, store } from "../../../../store/store";

import AccommoPick from "./AccommoPick";
import {
  calcColumns,
  setSelected,
} from "../../../../store/slices/accommoSlice";

const AccommModal = () => {
  const [column, setColumn] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const place = useSelector((state: Rootstate) => state.place.place);

  const columns = useSelector((state: Rootstate) => state.accommo.columns);
  const selected = useSelector((state: Rootstate) => state.accommo.selected);

  useEffect(() => {
    // contentId가 ''아닌 요소가 존재하는 여부 확인
    const isExisted = columns.findIndex((column) => column.contentId !== "");
    // 존재하지 않는다면 컬럼 리셋
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
      dispatch(fetchPlace({ contentId: place?.contentid, info: false }) as any);
    }
    dispatch(accommoToggle());
    dispatch(setSelected(false));
  };

  console.log("columns", columns);
  console.log("열림");
  console.log(selected);

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
                  index={column.index}
                  key={column.date.date}
                />
              ))}
            </ul>
          </div>
          <div className="select-all">전체 선택</div>
          <div
            className="done"
            onClick={
              selected
                ? () => {
                    handleSelection();
                  }
                : () => dispatch(accommoToggle())
            }
          >
            {selected ? "완료" : "되돌가기"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommModal;