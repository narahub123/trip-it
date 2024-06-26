import { ScheduleType } from "../../../types/schedules";
import SchedulesCard from "./ScheduleCard";
import "./schedules.css";

const Schedules = () => {
  // schedule data
  const schedules: ScheduleType[] = [
    {
      schedule_id: "1",
      metro_id: "1",
      start_date: "20240626",
      end_date: "20240628",
      schedule_time: "20240621",
      user_id: "1",
      schedule_title: "서울 여행",
    },
    {
      schedule_id: "2",
      metro_id: "2",
      start_date: "20240704",
      end_date: "20240712",
      schedule_time: "20240511",
      user_id: "1",
      schedule_title: "인천 여행",
    },
  ];
  return (
    <div className="schedules">
      <h3 className="schedules-title">내 여행 일정</h3>
      <div className="schedule-sort">
        <ul className="schedule-sort-container">
          <li className="schedule-sort-items">지역순</li>
          <li className="schedule-sort-items">날짜순</li>
          <li className="schedule-sort-items">등록순</li>
        </ul>
      </div>
      <div className="schedules-cards">
        <ul className="schedules-cards-container">
          {schedules.map((schedule) => (
            <SchedulesCard schedule={schedule} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Schedules;
