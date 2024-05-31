import React from "react";
import "./drops.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { dateMidFormatter, destrucDate, getWeek } from "../../../../utils/date";
import ScheduleColumn from "./ScheduleColumn";
const Drops = () => {
  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  // 일정
  const start =
    schedule.start_date &&
    destrucDate(dateMidFormatter(new Date(schedule.start_date)));
  const end =
    schedule.end_date &&
    destrucDate(dateMidFormatter(new Date(schedule.end_date)));

  return (
    <div className="drops">
      <div className="schedule-info">
        <div className="schedule-title">
          제목 : <input type="text" />
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
      <div className="schedule-columns">
        <ScheduleColumn />
        <ScheduleColumn />
        <ScheduleColumn />
      </div>
    </div>
  );
};

export default Drops;
