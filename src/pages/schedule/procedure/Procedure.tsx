import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./procedure.css";
import { useDispatch, useSelector } from "react-redux";
import { clearPageNo } from "../../../store/slices/placeSlice";
import { Rootstate } from "../../../store/store";
import axios from "axios";
import {
  CalculateDuration,
  dateFormatToLocalDate,
  dateFormateToLocalDatetime,
} from "../../../utils/date";
import { setBackToggle } from "../../../store/slices/uiSlice";
import Button from "../../../components/ui/Button";
import { getCookie } from "../../../utils/Cookie";
import { setSchedules } from "../../../store/slices/returnSlice";

const Procedure = () => {
  const location = useLocation();
  // url의 해시 정보를 가져옴
  const { hash } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);
  const endDate = useSelector((state: Rootstate) => state.date.end);
  const accommos = useSelector((state: Rootstate) => state.accommo.items);

  const columnPlaces = useSelector(
    (state: Rootstate) => state.columnPlaces.columnPlaces
  );

  const columnPlaces_1 = columnPlaces[`columnPlaces_1`];

  // 버튼에 포커스 주기
  useEffect(() => {
    // step1에서 endDate가 설정 되어 있는 경우 버튼에 포커스 주기
    if (endDate?.length !== 0 || endDate) buttonRef.current?.focus();

    // step2, step3에서 columnPlaces_1에 장소가 추가되면 포커스 주기
    if (columnPlaces_1) buttonRef.current?.focus();
  }, [endDate, columnPlaces_1]);

  // 로고를 눌러 이동할 때
  const handleLogo = () => {
    dispatch(setBackToggle());
  };

  // 리덕스 상태가 초기화 되면 step1으로 이동 (나중에 삭제?)
  useEffect(() => {
    if (hash !== "#step1") {
      if (endDate === undefined) {
        alert(`리덕스 상태가 초기화 되었습니다. step1으로 이동합니다.`);
        navigate("./#step1");
      }
    }
  }, [endDate]);

  // 날짜 선택이 완료되지 않은 경우
  const checkDates = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (endDate === undefined || (!endDate && endDate?.length === 0)) {
      e.preventDefault();
      window.alert("날짜 선택을 완료해주세요");
      if (hash !== "#step1") navigate("./#step1");
      return false;
    }

    return true;
  };

  // step 1 유효성 검사
  const handleClickStep1 = () => {};

  // step 2 유효성 검사
  const handleClickStep2 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // 날짜 선택 완료 여부 확인
    const validation = checkDates(e);
    dispatch(clearPageNo());

    return validation;
  };

  // step 3 유효성 검사
  const handleClickStep3 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // 날짜 선택 완료 여부 확인
    const validation = checkDates(e);
    dispatch(clearPageNo());

    return validation;
  };

  // step 4 유효성 검사
  const handleClickStep4 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // 날짜 선택 완료 여부 확인
    if (!checkDates(e)) return;

    // 장소 선택이 일정 날수보다 적은지 여부 확인

    if (schedule.start_date === undefined || schedule.end_date === undefined) {
      return false;
    }

    const dates = CalculateDuration(schedule.start_date, schedule.end_date).map(
      (_, index) => index
    );

    const keys = Object.keys(columnPlaces);

    let placeCount = 0;
    let accommoCount = 0;
    for (const dateKey of keys) {
      const colPlaces = columnPlaces[dateKey];
      for (let i = 0; i < colPlaces.length; i++) {
        const place = colPlaces[i];

        if (place.contenttypeid === "32") accommoCount++;
        else placeCount++;
      }
    }

    console.log(placeCount);
    console.log(accommoCount);
    console.log(dates.length * 2 - 1);

    if (placeCount < dates.length) {
      e.preventDefault();
      alert("장소 개수가 부족합니다.");

      return false;
    }

    if (accommoCount < dates.length * 2 - 1) {
      alert("숙소 선택을 완료해주세요");

      return false;
    }

    // 숙소 선택 완료 여부 확인
    // const accommosObj = Object.values(accommos);
    // for (const accommo of accommosObj) {
    //   console.log(accommo);

    //   if (accommo.contentId.length === 0) {
    //     e.preventDefault();
    //     alert("숙소가 부족합니다. 추가로 선택을 완료해주세요");
    //     return false;
    //   }
    // }

    return true;
  };

  const handleEnterStep4 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const validation = handleClickStep4(e);

    if (!validation) return;

    navigate("#step4");
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

        // nodejs
        // const detail = {
        //   schedule_order: key.split("columnPlaces")[1],
        //   start_time: place.start_time,
        //   end_time: place.end_time,
        //   content_id: place.contentid,
        //   createdAt: new Date().toISOString(),
        // };

        // java
        const detail = {
          schedule_order: key.split("columnPlaces")[1],
          start_time: dateFormateToLocalDatetime(place.start_time),
          end_time: dateFormateToLocalDatetime(place.end_time),
          content_id: place.contentid,
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
      scheduleDto: {
        metro_id: schedule.metro_id,
        start_date: start,
        end_date: end,
        schedule_title: schedule.schedule_title,
      },
      detailScheduleDto: schedule_details,
    };

    console.log(value);

    // 일정 보내고 목록 받기
    axios
      // .post(`http://localhost:8080/schedules`, valueNode)
      .post(`http://172.16.1.118:8080/home/saveSchedule`, value, {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("정상적으로 처리되었습니다.");

          console.log(response);

          // 데이터를 redux에 넣어서 mypage에서 뜰 수 있게 할 것
          console.log(response.data);

          dispatch(setSchedules(response.data));

          navigate("/mypage/schedules");
        }
      })
      .catch((error) => console.log(error.response.data));

    // 하나만 받는 경우
    // const userId = 1;
    // const schedule_id = 31;
    // axios
    //   .get(`http://172.16.1.145:8080/home/${userId}/${schedule_id}`)
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.log(error.response.data));
  };

  // 클릭하면 다음 해시로 이동하게 하는 이벤트
  const handleNext = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (hash === "#step1") {
      const validation = handleClickStep2(e);

      if (!validation) return;
    }

    if (hash === "#step2") {
      const validation = handleClickStep3(e);
    }

    if (hash === "#step3") {
      const validation = handleClickStep4(e);

      if (!validation) return;
    }
    navigate(`#step${Number(hash.split("#step")[1]) + 1}`);
  };

  return (
    <aside className="procedure">
      <figure className="proc-nav">
        <div onClick={() => handleLogo()}>
          <img src="/images/trip-it-logo.png" alt="로고" />
        </div>
      </figure>
      <nav>
        <ul>
          <li>
            <Link
              to="#step1"
              className={
                hash === "" || hash === "#step1" ? "link active" : "link"
              }
              replace={true}
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
              replace={true}
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
              replace={true}
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
              onClick={(e) => handleEnterStep4(e)}
              replace={true}
            >
              <div className="step-container">
                <p className="step">STEP 4 </p>
                <p className="desc">일정 결정</p>
              </div>
            </Link>
          </li>
          {(hash === "#step1" || hash === "#step2" || hash === "#step3") && (
            <Link
              to="."
              onClick={(e) => handleNext(e)}
              ref={buttonRef}
              style={{ outline: "none" }}
            >
              <Button name="다음" />
            </Link>
          )}
          {hash === "#step4" && (
            <li onClick={() => handleSubmit()}>
              <Button name="등록" />
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Procedure;
