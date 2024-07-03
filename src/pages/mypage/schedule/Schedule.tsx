import { useSelector } from "react-redux";
import "./schedule.css";
import { Rootstate, store } from "../../../store/store";
import { useEffect } from "react";
import { getSchedule } from "../../../store/slices/returnSlice";
import { useLocation, useParams } from "react-router-dom";

const Schedule = () => {
  const { scheduleId } = useParams();

  const schedules = useSelector((state: Rootstate) => state.return.schedules);
  // 목록에서 현재 일정 가져오기
  const curSchedule = schedules.find((item) => {
    console.log(item.schedule_id === Number(scheduleId));

    if (scheduleId) return item.schedule_id.toString() === scheduleId;
  });

  // 일정 상세
  const schedule = useSelector((state: Rootstate) => state.return.schedule);

  console.log(curSchedule);

  console.log(schedule);

  useEffect(() => {
    if (scheduleId)
      store.dispatch(getSchedule({ schedule_id: Number(scheduleId) }));
  }, []);
  return <div className="schedule">schedule</div>;
};

export default Schedule;
