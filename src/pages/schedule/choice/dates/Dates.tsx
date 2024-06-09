import React from "react";
import "./dates.css";
import Calendar from "./Calendar";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { minusMonth, plusMonth } from "../../../../store/slices/dateSlice";

const Dates = () => {
  const dispatch = useDispatch();
  const today = useSelector((state: Rootstate) => state.date.base);
  const curMonth = useSelector((state: Rootstate) => state.date.leftMonth);
  const nextMonth = useSelector((state: Rootstate) => state.date.rightMonth);

  return (
    <div className="dates">
      <div className="container">
        <section className="explanation">
          <p className="line1">
            <b>여행 기간이 어떻게 되시나요?</b>
          </p>
          <p className="line2">
            여행일자는 <b>최대 10일</b>까지 설정 가능합니다.
          </p>
          <p className="line3">
            현재 여행 기간 <b>(여행지 도착 날짜, 여행지 출발 날짜)</b>으로
            입력해주세요.
          </p>
        </section>
        <section className="calendar-container">
          <div className="months">
            <section className="curMonth">
              <div>
                <nav
                  className="before"
                  onClick={() => {
                    dispatch(minusMonth());
                  }}
                >
                  <LuChevronLeft />
                </nav>
                <p className="curMon">
                  {`${curMonth.year}년 ${curMonth.month + 1}월`}
                </p>
              </div>
              <Calendar month={curMonth} key={"curMonth"} />
            </section>
            <section className="nextMonth">
              <div>
                <p className="nextMon">
                  {`${nextMonth.year}년 ${nextMonth.month + 1}월`}
                </p>
                <nav
                  className="after"
                  onClick={() => {
                    dispatch(plusMonth());
                  }}
                >
                  <LuChevronRight />
                </nav>
              </div>
              <Calendar month={nextMonth} key={"nextMonth"} />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dates;
