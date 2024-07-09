import { Link } from "react-router-dom";
import { metros } from "../../../data/metros";
import useDefaultImage from "../../../hooks/useDefaultImage";
import { ScheduleReturnType, ScheduleType } from "../../../types/schedules";
import "./schedulesCard.css";
import { metroName } from "../../../utils/metro";
import { dateFormatFromLocalDate } from "../../../utils/date";
import { DestrucDateType } from "../../schedule/choice/dates/Calendar";
import { useEffect, useRef, useState } from "react";
import { debounce } from "../../../utils/debounce";

export interface DeletionsType {
  schedule_id: number;
  deletion: boolean;
}

export interface SchedulesCardProps {
  schedule: ScheduleReturnType;
  showDelete: boolean;
  setShowDelete: (value: boolean) => void;
  deletions: DeletionsType[];
  setDeletions: (value: DeletionsType[]) => void;
}

const SchedulesCard = ({
  schedule,
  showDelete,
  setShowDelete,
  deletions,
  setDeletions,
}: SchedulesCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultImage = useDefaultImage(schedule.metro_id);

  const { start_date, end_date, register_date, schedule_id } = schedule;
  const start: DestrucDateType = start_date
    ? dateFormatFromLocalDate(start_date)
    : { year: 0, month: 0, date: 0 };

  const end: DestrucDateType = end_date
    ? dateFormatFromLocalDate(end_date)
    : { year: 0, month: 0, date: 0 };

  const register: DestrucDateType = register_date
    ? dateFormatFromLocalDate(register_date)
    : { year: 0, month: 0, date: 0 };

  useEffect(() => {
    // deletion과 카드의 id가 같은 것 같기
    const result = deletions.find(
      (deletion) => deletion.schedule_id === schedule_id
    );

    if (result) {
      if (result.deletion) {
        inputRef.current?.removeAttribute("checked");
      } else {
        inputRef.current?.setAttribute("checked", "true");
      }
    }
  }, [deletions, schedule_id]);

  const handleDeletion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.id;

    if (checked) {
      const newDeletions = deletions.map((deletion) => {
        if (deletion.schedule_id === Number(id)) {
          return {
            schedule_id: Number(id),
            deletion: true,
          };
        } else {
          return deletion;
        }
      });
      console.log(newDeletions);

      setDeletions(newDeletions);
    } else if (!checked) {
      const newDeletions = deletions.map((deletion) => {
        if (deletion.schedule_id === Number(id)) {
          return {
            schedule_id: Number(id),
            deletion: false,
          };
        } else {
          return deletion;
        }
      });

      console.log(newDeletions);
      setDeletions(newDeletions);
    }
    console.log(id);
  };

  console.log(schedule.schedule_id);

  return (
    <li
      className="schedules-card"
      style={{
        backgroundImage: `url(${defaultImage})`,
      }}
      key={schedule.schedule_id}
    >
      {/* 삭제 체크 박스 */}
      <div className="schedules-card-delete">
        {showDelete && (
          <input
            type="checkbox"
            className="deletion"
            id={schedule.schedule_id.toString()}
            onChange={(e) => handleDeletion(e)}
            checked={
              deletions.find((deletion) => deletion.schedule_id === schedule_id)
                ?.deletion
            }
            ref={inputRef}
          />
        )}
      </div>
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
