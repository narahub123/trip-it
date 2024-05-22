import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./procedure.css";

const Procedure = () => {
  const location = useLocation();
  // url의 해시 정보를 가져옴
  const { hash } = location;

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
              STEP 1 <br />
              날짜 선택
            </Link>
          </li>
          <li>
            <Link
              to="#step2"
              className={hash === "#step2" ? "link active" : "link"}
            >
              STEP 2 <br />
              장소 선택
            </Link>
          </li>
          <li>
            <Link
              to="#step3"
              className={hash === "#step3" ? "link active" : "link"}
            >
              STEP 3 <br />
              숙소 선택
            </Link>
          </li>
          <li>
            <Link
              to="#step4"
              className={hash === "#step4" ? "link active" : "link"}
            >
              STEP 4 <br />
              일정 결정
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Procedure;
