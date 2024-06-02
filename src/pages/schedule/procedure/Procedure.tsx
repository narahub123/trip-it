import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./procedure.css";
import { useDispatch, useSelector } from "react-redux";
import { clearPageNo } from "../../../store/slices/placeSlice";
import { Rootstate } from "../../../store/store";
import axios from "axios";

const Procedure = () => {
  const location = useLocation();
  // url의 해시 정보를 가져옴
  const { hash } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schedule = useSelector((state: Rootstate) => state.schedule.schedule);

  const handleSubmit = () => {
    // 유효성 검사
    if (schedule.metro_id === "") {
      console.log("여행지를 선택해주세요");
      return;
    }

    if (schedule.start_date === undefined || schedule.end_date === undefined) {
      console.log("여행 일자를 선택해주세요");
      return;
    }

    if (schedule.schedule_name === "") {
      console.log("여행의 제목을 작성해주세요");
      return;
    }

    if (schedule.schedule_details?.length === 0) {
      console.log("여행할 장소를 선택해주세요");
      return;
    }

    axios
      .post(`http://localhost:8080/schedules`, schedule)
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
        <Link to="/">
          <img src="" alt="로고" />
        </Link>
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
              onClick={() => {
                dispatch(clearPageNo());
              }}
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
              onClick={() => {
                dispatch(clearPageNo());
              }}
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
