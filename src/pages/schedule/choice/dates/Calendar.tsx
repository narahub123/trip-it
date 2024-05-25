import React, { useEffect } from "react";
import "./calendar.css";
import {
  dateMidFormatter,
  datesOfMonth,
  tenDaysLater,
  weekOfDay,
} from "../../../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../../../store/store";
import { addEnd, addStart } from "../../../../store/slices/dateSlice";

interface CalendarProps {
  month: {
    year: number;
    month: number;
    date: number;
  };
}

const Calendar = ({ month }: CalendarProps) => {
  const dispatch = useDispatch();
  const startDate = useSelector((state: Rootstate) => state.date.start);
  const endDate = useSelector((state: Rootstate) => state.date.end);

  const date = new Date(month.year, month.month, month.date);

  const dates = datesOfMonth(date);

  const curDate = (date: number) => new Date(month.year, month.month, date);

  const exDate = (date: number) => new Date(month.year, month.month - 1, date);

  const handleClick = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    const className = e.currentTarget.className;
    const date = e.currentTarget.dataset.date;

    if (className.includes("possible") && date) {
      return dispatch(addEnd(date));
    }

    if (date) {
      dispatch(addStart(date));
      dispatch(addEnd(""));
    }
  };

  const start = startDate && new Date(startDate);
  const end = endDate && new Date(endDate);

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr>
            {weekOfDay.map((day, index) =>
              index === 0 ? (
                <th className="sun" key={index}>
                  {day}
                </th>
              ) : index === 6 ? (
                <th className="sat" key={index}>
                  {day}
                </th>
              ) : (
                <th className="day" key={index}>
                  {day}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {dates.map(
            (date, index) =>
              index % 7 === 0 && (
                <tr key={index + 1}>
                  {dates.map(
                    (date, i) =>
                      index <= i &&
                      i < index + 7 && (
                        <td
                          key={i}
                          data-date={
                            i > date
                              ? curDate(date).toDateString()
                              : exDate(date).toDateString()
                          }
                          className={
                            date > i
                              ? "date ex"
                              : (start &&
                                  start.getTime() ===
                                    curDate(date).getTime()) ||
                                (start &&
                                  end &&
                                  start < curDate(date) &&
                                  curDate(date) <= end)
                              ? "date selected"
                              : start &&
                                !end &&
                                start < curDate(date) &&
                                curDate(date) < tenDaysLater(start)
                              ? "date possible"
                              : i % 7 === 0
                              ? "date sun"
                              : i % 7 === 6
                              ? "date sat"
                              : "date"
                          }
                          onClick={(e) => handleClick(e)}
                        >
                          {date}
                        </td>
                      )
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
