import React from "react";
import "./drops.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import {
  CalculateDuration,
  dateMidFormatter,
  destrucDate,
  getWeek,
} from "../../../../utils/date";
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

  const dates =
    schedule.start_date &&
    schedule.end_date &&
    CalculateDuration(schedule.start_date, schedule.end_date);

  console.log(dates);

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
        {dates &&
          dates.map((date: any, index: number) => (
            <ScheduleColumn date={date} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Drops;
