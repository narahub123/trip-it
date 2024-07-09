import { useSelector } from "react-redux";
import "./schedule.css";
import { Rootstate, store } from "../../../store/store";
import { useEffect } from "react";
import { getSchedule } from "../../../store/slices/returnSlice";
import { useLocation, useParams } from "react-router-dom";

const Schedule = () => {
  const { schedule_id } = useParams();

  const schedules = useSelector((state: Rootstate) => state.return.schedules);
  // 목록에서 현재 일정 가져오기
  const curSchedule = schedules.find((item) => {
    console.log(item.schedule_id === Number(schedule_id));

    if (schedule_id) return item.schedule_id.toString() === schedule_id;
  });

  // 일정 상세
  const schedule = useSelector((state: Rootstate) => state.return.schedule);

  console.log(curSchedule);

  console.log(schedule);

  useEffect(() => {
    if (schedule_id)
      store.dispatch(getSchedule({ scheduleId: Number(schedule_id) }));
  }, []);
  return <div className="schedule">schedule</div>;
};

export default Schedule;
