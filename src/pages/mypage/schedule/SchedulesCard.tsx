import { Link } from "react-router-dom";
import { metros } from "../../../data/metros";
import useDefaultImage from "../../../hooks/useDefaultImage";
import { ScheduleType } from "../../../types/schedules";
import "./schedulesCard.css";
import { metroName } from "../../../utils/metro";
import { dateFormatFromLocalDate } from "../../../utils/date";
import { DestrucDateType } from "../../schedule/choice/dates/Calendar";
import { useEffect, useRef, useState } from "react";
import { debounce } from "../../../utils/debounce";

export interface SchedulesCardProps {
  schedule: ScheduleType;
}

const SchedulesCard = ({ schedule }: SchedulesCardProps) => {
  const defaultImage = useDefaultImage(schedule.metro_id);

  const { start_date, end_date, register_date } = schedule;
  const start: DestrucDateType = start_date
    ? dateFormatFromLocalDate(start_date)
    : { year: 0, month: 0, date: 0 };

  const end: DestrucDateType = end_date
    ? dateFormatFromLocalDate(end_date)
    : { year: 0, month: 0, date: 0 };

  const register: DestrucDateType = register_date
    ? dateFormatFromLocalDate(register_date)
    : { year: 0, month: 0, date: 0 };

  return (
    <li
      className="schedules-card"
      style={{
        backgroundImage: `url(${defaultImage})`,
      }}
      key={schedule.schedule_id}
    >
      <Link to={`${schedule.schedule_id}`} className="schedules-card-link">
        <div className="schedules-card-container">
          <div className="schedules-card-cap">
            <div className="schedules-card-cap-container">
              <p className="schedules-card-title">{schedule.schedule_title}</p>
              <p className="schedules-card-duration">
                {`${start.year}.${start.month + 1}.${start.date}.`} -{" "}
                {`${end.year}.${end.month + 1}.${end.date}.`}
              </p>
              <div className="schedules-card-bottom">
                <p className="schedules-card-register-date">
                  {`${register.year}.${register.month + 1}.${register.date}.`}
                </p>
                <p className="schedules-card-location">
                  {schedule.metro_id && metroName(schedule.metro_id)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SchedulesCard;
