import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./procedure.css";
import { useDispatch, useSelector } from "react-redux";
import { clearPageNo } from "../../../store/slices/placeSlice";
import { Rootstate } from "../../../store/store";
import axios from "axios";
import { CalculateDuration, dateFormatToLocalDate } from "../../../utils/date";
import { contentTypeIds } from "../../../data/contentTypeIds";
import usePreventRefresh from "../../../hooks/usePreventRefresh";

const Procedure = () => {
  const location = useLocation();
  // url의 해시 정보를 가져옴
  const { hash } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const endDate = useSelector((state: Rootstate) => state.date.end);
  const accommos = useSelector((state: Rootstate) => state.accommo.columns);

  console.log(accommos);

  const columnPlaces = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );

  // 날짜 선택이 완료되지 않은 경우
  const checkDates = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (endDate === undefined || (!endDate && endDate?.length === 0)) {
      e.preventDefault();
      window.alert("날짜 선택을 완료해주세요");
      return false;
    }

    return true;
  };

  const handleClickStep1 = () => {};
  const handleClickStep2 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // 날짜 선택 완료 여부 확인
    checkDates(e);
    dispatch(clearPageNo());
  };
  const handleClickStep3 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // 날짜 선택 완료 여부 확인
    checkDates(e);
    dispatch(clearPageNo());
  };

  // step 4 유효성 검사
  const handleClickStep4 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // 날짜 선택 완료 여부 확인
    if (!checkDates(e)) return;

    // 장소 선택이 일정 날수보다 적은지 여부 확인
    const columnPlaces_1 = columnPlaces["columnPlaces_1"];

    // accommos의 개수는 날수 -1이므로 +1하면 날 수와 동일함
    if (accommos.length + 1 > columnPlaces_1.length) {
      e.preventDefault();
      alert(
        `선택한 장소의 개수가 날 수 보다 적습니다. \n장소를 더 선택해주세요.`
      );
    }

    // 숙소 선택 완료 여부 확인
    const accommosObj = Object.values(accommos);
    for (const accommo of accommosObj) {
      if (accommo.contentId.length === 0) {
        e.preventDefault();
        alert("숙소 선택을 완료해주세요");
        return;
      }
    }
  };

  // 일정 제출 시 유효성 검사
  const handleSubmit = () => {
    // 유효성 검사
    // 여행지 선택 여부 검사
    if (schedule.metro_id === "") {
      alert("여행지를 선택해주세요");
      return;
    }

    // 여행일자 선택 여부 검사
    if (schedule.start_date === undefined || schedule.end_date === undefined) {
      alert("여행 일자를 선택해주세요");
      return;
    }

    // 일정 제목 작성 여부 검사
    if (schedule.schedule_title === "") {
      alert("여행의 제목을 작성해주세요");
      return;
    }

    // schedule_details에 columnPlaces 요소들 넣기
    const schedule_details = [];

    const dates = CalculateDuration(schedule.start_date, schedule.end_date).map(
      (_, index) => index
    );

    for (const dateKey of dates) {
      const key = `columnPlaces${dateKey}`;
      const colPlaces = columnPlaces[key];
      let placeCount = 0;
      let accommoCount = 0;
      for (let i = 0; i < colPlaces.length; i++) {
        const place = colPlaces[i];
        const detail = {
          schedule_order: key.split("columnPlaces")[1],
          start_time: place.start_time,
          end_time: place.end_time,
          content_id: place.contentid,
          createdAt: new Date().toISOString(),
        };
        schedule_details.push(detail);
        if (place.contenttypeid === "32") accommoCount++;
        else placeCount++;
      }
      // 장소 개수 확인
      if (placeCount < 1) {
        alert("장소의 개수가 부족합니다");
        return;
      }
      // 첫날과 마지막의 경우
      if (dateKey === 0 || dateKey === dates.length - 1) {
        if (accommoCount < 1) {
          alert("숙소 개수가 부족합니다.");
          return;
        }
      }
      // 그 외의 날
      else {
        if (accommoCount < 2) {
          alert("숙소 개수가 부족합니다.");
          return;
        }
      }
    }

    // node js 저장시
    const valueNode = {
      metro_id: schedule.metro_id,
      user_id: 1,
      start_date: schedule.start_date,
      end_date: schedule.end_date,
      schedule_title: schedule.schedule_title,
      schedule_details,
    };

    // 스프링 부트 저장시
    // db 저장 형식에 맞춰서 date 포멧 변경
    const start =
      schedule.start_date && dateFormatToLocalDate(schedule.start_date);
    const end = schedule.end_date && dateFormatToLocalDate(schedule.end_date);
    const value = {
      metro_id: schedule.metro_id,
      user_id: 1,
      start_date: start,
      end_date: end,
      schedule_title: schedule.schedule_title,
    };

    axios
      .post(`http://localhost:8080/schedules`, valueNode)
      // .post(`http://172.16.1.88:8080/home/save`, value)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("정상적으로 처리되었습니다.");
          navigate("/mypage");
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <aside className="procedure">
      <figure className="proc-nav">
        <a href="/">
          <img src="/images/trip-it-logo.png" alt="로고" />
        </a>
      </figure>
      <nav>
        <ul>
          <li>
            <Link
              to="#step1"
              className={
                hash === "" || hash === "#step1" ? "link active" : "link"
              }
            >
              <div className="step-container">
                <p className="step">STEP 1 </p>
                <p className="desc">날짜 선택</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#step2"
              className={hash === "#step2" ? "link active" : "link"}
              onClick={(e) => handleClickStep2(e)}
            >
              <div className="step-container">
                <p className="step">STEP 2 </p>
                <p className="desc">장소 선택</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#step3"
              className={hash === "#step3" ? "link active" : "link"}
              onClick={(e) => handleClickStep3(e)}
            >
              <div className="step-container">
                <p className="step">STEP 3 </p>
                <p className="desc">숙소 선택</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#step4"
              className={hash === "#step4" ? "link active" : "link"}
              onClick={(e) => handleClickStep4(e)}
            >
              <div className="step-container">
                <p className="step">STEP 4 </p>
                <p className="desc">일정 결정</p>
              </div>
            </Link>
          </li>
          <li>
            <button onClick={() => handleSubmit()}>등록</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Procedure;
