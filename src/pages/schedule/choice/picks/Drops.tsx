import React, { useEffect, useState } from "react";
import "./drops.css";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  CalculateDuration,
  dateMidFormatter,
  destrucDate,
  getWeek,
} from "../../../../utils/date";
import ScheduleColumn from "./ScheduleColumn";
import { debounce } from "../../../../utils/debounce";
import { addTitle } from "../../../../store/slices/scheduleSlice";
import { clearColumnPlaces } from "../../../../store/slices/columnPlacesSlice";
import { useNavigate } from "react-router-dom";
import { resetDates } from "../../../../store/slices/dateSlice";
import { DestrucDateType } from "../dates/Calendar";
const Drops = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // 동적으로 그리드의 컬럼 개수 변경하기
  const colCount = dates?.length || 0;

  useEffect(() => {
    const scheduleColumns = document.querySelector(".schedule-columns");
    if (scheduleColumns) {
      // Element에 style 적용이 안돼서 HTMLElement로 캐스팅 함
      (scheduleColumns as HTMLElement).style.setProperty(
        "--col-count",
        colCount?.toString()
      );
    }
  }, [colCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;

    setTitle(title.trim());
    dispatch(addTitle(title.trim()));
  };

  const handleReset = () => {
    if (!window.confirm(`모든 정보를 초기화하시겠습니다?`)) {
      return;
    }
    dispatch(resetDates());
    dispatch(clearColumnPlaces());
    navigate("./#step1");
  };

  const debounceOnChange = debounce<typeof handleChange>(handleChange, 500);

  return (
    <div className="drops">
      <div className="schedule-info">
        <div className="info-left">
          <div className="schedule-title">
            제목 :
            <input
              type="text"
              defaultValue={title}
              onChange={debounceOnChange}
            />
          </div>
          <div className="schedule-duration">
            {start &&
              schedule.start_date &&
              end &&
              schedule.end_date &&
              `일정 : ${start.year}.${start.month + 1}.${start.date}(${getWeek(
                new Date(schedule.start_date)
              )}) - ${end.year}.${end.month + 1}.${end.date}(${getWeek(
                new Date(schedule.end_date)
              )})`}
          </div>
        </div>
        <div className="info-right">
          <div className="reset" onClick={handleReset}>
            일정 초기화
          </div>
        </div>
      </div>

      <div className="schedule-columns">
        {dates &&
          dates.map((date: DestrucDateType, index: number) => (
            <ScheduleColumn date={date} colNum={index} key={`col${index}`} />
          ))}
      </div>
    </div>
  );
};

export default Drops;
