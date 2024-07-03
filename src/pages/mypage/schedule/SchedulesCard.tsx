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
  scheduleId: number;
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
  const defaultImage = useDefaultImage(schedule.metroId);

  const { startDate, endDate, registerDate, scheduleId } = schedule;
  const start: DestrucDateType = startDate
    ? dateFormatFromLocalDate(startDate)
    : { year: 0, month: 0, date: 0 };

  const end: DestrucDateType = endDate
    ? dateFormatFromLocalDate(endDate)
    : { year: 0, month: 0, date: 0 };

  const register: DestrucDateType = registerDate
    ? dateFormatFromLocalDate(registerDate)
    : { year: 0, month: 0, date: 0 };

  useEffect(() => {
    // deletion과 카드의 id가 같은 것 같기
    const result = deletions.find(
      (deletion) => deletion.scheduleId === scheduleId
    );

    if (result) {
      if (result.deletion) {
        inputRef.current?.removeAttribute("checked");
      } else {
        inputRef.current?.setAttribute("checked", "true");
      }
    }
  }, [deletions, scheduleId]);

  const handleDeletion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.id;

    if (checked) {
      const newDeletions = deletions.map((deletion) => {
        if (deletion.scheduleId === Number(id)) {
          return {
            scheduleId: Number(id),
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
        if (deletion.scheduleId === Number(id)) {
          return {
            scheduleId: Number(id),
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

  return (
    <li
      className="schedules-card"
      style={{
        backgroundImage: `url(${defaultImage})`,
      }}
      key={schedule.scheduleId}
    >
      {/* 삭제 체크 박스 */}
      <div className="schedules-card-delete">
        {showDelete && (
          <input
            type="checkbox"
            className="deletion"
            id={scheduleId.toString()}
            onChange={(e) => handleDeletion(e)}
            checked={
              deletions.find((deletion) => deletion.scheduleId === scheduleId)
                ?.deletion
            }
            ref={inputRef}
          />
        )}
      </div>
      <Link to={`${schedule.scheduleId}`} className="schedules-card-link">
        <div className="schedules-card-container">
          <div className="schedules-card-cap">
            <div className="schedules-card-cap-container">
              <p className="schedules-card-title">{schedule.scheduleTitle}</p>
              <p className="schedules-card-duration">
                {`${start.year}.${start.month + 1}.${start.date}.`} -{" "}
                {`${end.year}.${end.month + 1}.${end.date}.`}
              </p>
              <div className="schedules-card-bottom">
                <p className="schedules-card-register-date">
                  {`${register.year}.${register.month + 1}.${register.date}.`}
                </p>
                <p className="schedules-card-location">
                  {schedule.metroId && metroName(schedule.metroId)}
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
