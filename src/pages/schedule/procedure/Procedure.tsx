import React from "react";
import { Link } from "react-router-dom";
import "./procedure.css";

const Procedure = () => {
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
            <Link to="#step1">
              STEP 1 <br />
              날짜 선택
            </Link>
          </li>
          <li>
            <Link to="#step2">
              STEP 2 <br />
              장소 선택
            </Link>
          </li>
          <li>
            <Link to="#step3">
              STEP 3 <br />
              숙소 선택
            </Link>
          </li>
          <li>
            <Link to="#step4">
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
