import { useState } from "react";
import { ScheduleType } from "../../../types/schedules";
import SchedulesCard from "./ScheduleCard";
import "./schedules.css";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";

const Schedules = () => {
  const schedules = useSelector((state: Rootstate) => state.return.schedules);
  const [open, setOpen] = useState({
    areacode: false,
    date: false,
    register: false,
  });
  // schedule data
  // const schedules: ScheduleType[] = [
  //   {
  //     schedule_id: "1",
  //     metro_id: "1",
  //     start_date: "20240626",
  //     end_date: "20240628",
  //     schedule_time: "20240621",
  //     user_id: "1",
  //     schedule_title: "서울 여행",
  //   },
  //   {
  //     schedule_id: "2",
  //     metro_id: "2",
  //     start_date: "20240704",
  //     end_date: "20240712",
  //     schedule_time: "20240511",
  //     user_id: "1",
  //     schedule_title: "인천 여행",
  //   },
  // ];

  const [filteredSchedules, setFilteredSchedules] =
    useState<ScheduleType[]>(schedules);

  return (
    <div className="schedules">
      <h3 className="schedules-title">내 여행 일정</h3>
      <div className="schedule-sort">
        <ul className="schedule-sort-container">
          <li className="schedule-sort-item" key={"areacode"} id="areacode">
            <p>지역순</p>

            <ul className="schedule-sort-dropdown-container">
              <li className="schedule-sort-dropdown-item" key={"areacode0"}>
                지역코드순서: 오름차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"areacode1"}>
                지역코드순서: 내림차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"areacode2"}>
                지역이름순서: 오름차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"areacode3"}>
                지역이름순서: 내림차순
              </li>
            </ul>
          </li>
          <li className="schedule-sort-item" key={"date"} id="date">
            <p>일정순</p>

            <ul className="schedule-sort-dropdown-container">
              <li className="schedule-sort-dropdown-item" key={"date0"}>
                일정시작날짜: 오름차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"date1"}>
                일정시작날짜: 내림차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"date2"}>
                일정기간기준: 오름차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"date3"}>
                일정기간기준: 내림차순
              </li>
            </ul>
          </li>
          <li className="schedule-sort-item" key={"register"} id="register">
            <p>등록일</p>

            <ul className="schedule-sort-dropdown-container">
              <li className="schedule-sort-dropdown-item" key={"register0"}>
                등록일기준: 오름차순
              </li>
              <li className="schedule-sort-dropdown-item" key={"register1"}>
                등록일기준: 내림차순
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="schedules-cards">
        <ul className="schedules-cards-container">
          {schedules.map((schedule, index) => (
            <SchedulesCard schedule={schedule} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Schedules;
