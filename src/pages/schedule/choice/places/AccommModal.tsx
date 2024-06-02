import React, { useState } from "react";
import "./accommoModal.css";

import { useDispatch, useSelector } from "react-redux";
import {
  accommoToggle,
  addContentId,
  fetchPlace,
} from "../../../../store/slices/placeSlice";
import { Rootstate } from "../../../../store/store";
import {
  CalculateDuration,
  dateMidFormatter,
  destrucDate,
} from "../../../../utils/date";
import AccommoPick from "./AccommoPick";

const AccommModal = () => {
  const [column, setColumn] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const place = useSelector((state: Rootstate) => state.place.place);
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);

  // 일정
  const start =
    schedule.start_date &&
    destrucDate(dateMidFormatter(new Date(schedule.start_date)));
  const end =
    schedule.end_date &&
    destrucDate(dateMidFormatter(new Date(schedule.end_date)));

  const dates =
    schedule.start_date &&
    schedule.end_date &&
    CalculateDuration(schedule.start_date, schedule.end_date);

  const filteredDates = dates?.slice(0, dates.length - 1);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (e.currentTarget.className === "accommo-modal") {
      dispatch(accommoToggle());
    }
  };

  console.log("컬럼", column);

  const handleSelection = () => {
    if (place) {
      dispatch(addContentId({ contentId: place?.contentid, column }));
      dispatch(fetchPlace({ contentId: place?.contentid, info: false }) as any);
    }
    dispatch(accommoToggle());
  };
  return (
    <div className="accommo-modal" onClick={(e) => handleToggle(e)}>
      <div className="accommo-container" onClick={(e) => handleToggle(e)}>
        <div className="container">
          <div className="desc">숙박하실 날짜를 선택해주세요</div>
          <div className="accommo-title">{place?.title}</div>
          <div className="accommo-list-container">
            <ul>
              {filteredDates &&
                typeof filteredDates !== "string" &&
                filteredDates.map((date, index) => (
                  <AccommoPick
                    date={date}
                    index={index}
                    setColumn={setColumn}
                  />
                ))}
            </ul>
          </div>
          <div className="select-all">전체 선택</div>
          <div
            className="done"
            onClick={() => {
              handleSelection();
            }}
          >
            완료
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommModal;
