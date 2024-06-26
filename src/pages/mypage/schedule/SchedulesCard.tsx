import { Link } from "react-router-dom";
import { metros } from "../../../data/metros";
import useDefaultImage from "../../../hooks/useDefaultImage";
import { ScheduleType } from "../../../types/schedules";
import "./schedulesCard.css";
import { metroName } from "../../../utils/metro";

export interface SchedulesCardProps {
  schedule: ScheduleType;
}

const SchedulesCard = ({ schedule }: SchedulesCardProps) => {
  const defaultImage = useDefaultImage(schedule.metro_id);

  return (
    <li
      className="schedules-card"
      style={{
        backgroundImage: `url(${defaultImage})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
      key={schedule.schedule_id}
    >
      <Link to={`${schedule.schedule_id}`} className="schedules-card-link">
        <div className="schedules-card-cap">
          <div className="schedules-card-cap-container">
            <p className="schedules-card-title">{schedule.schedule_title}</p>
            <p className="schedules-card-duration">
              날짜 : {schedule.start_date} - {schedule.end_date}
            </p>
            <div className="schedules-card-bottom">
              <p className="schedules-card-register-date">
                {schedule.register_date}
              </p>
              <p className="schedules-card-location">
                {schedule.metro_id && metroName(schedule.metro_id)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SchedulesCard;
