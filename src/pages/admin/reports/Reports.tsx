import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import {
  reportName,
  reportResult,
  reportsHeaders,
} from "../../../data/reports";
import { reports } from "../../../data/test";
import { ReportType } from "../../../types/reports";
import { dateFromLocalDateToDot } from "../../../utils/date";
import "./reports.css";
import { useState } from "react";

const Reports = () => {
  const [filteredReports, setFilteredReports] = useState(reports);
  const unsolved = reports.filter((report) => report.report_false === 0).length;
  const [sorts, setSorts] = useState({
    report_cate: "desc",
    user_id: "desc",
    reported_user_id: "desc",
    post_id: "desc",
    report_detail: "desc",
    report_date: "desc",
    report_false: "desc",
  });

  // 정렬
  const handleSort = (
    e: React.MouseEvent<HTMLTableHeaderCellElement | HTMLLIElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id as keyof (typeof filteredReports)[0];
    const sort = e.currentTarget.dataset.sort;

    let sortedReports = filteredReports;

    sortedReports = [...filteredReports].sort((user1, user2) => {
      if (user1[id] === null || user2[id] === null) return -1;

      const usersArr = [user1, user2];

      if (sort === "asc") {
        usersArr.reverse();
        e.currentTarget.dataset.sort = "desc";
        setSorts({
          ...sorts,
          [id]: "desc",
        });
      } else if (sort === "desc") {
        usersArr.sort();
        e.currentTarget.dataset.sort = "asc";
        setSorts({
          ...sorts,
          [id]: "asc",
        });
      }

      let result = 0;
      if (
        typeof usersArr[0][id] === "number" &&
        typeof usersArr[1][id] === "number"
      ) {
        result = (usersArr[0][id] as number) - (usersArr[1][id] as number);
      } else if (
        typeof usersArr[0][id] === "string" &&
        typeof usersArr[1][id] === "string"
      ) {
        result = (usersArr[0][id] as string).localeCompare(
          usersArr[1][id] as string
        );
      }

      return result;
    });

    setFilteredReports(sortedReports);
  };

  // 필터링
  const handleFilter = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    const filter = e.currentTarget.dataset.filter;

    console.log(id);
    console.log(filter);

    const newFilter = id === "report_false" ? Number(filter) : filter;

    const newReports = filteredReports.filter(
      (report) => report[id as keyof ReportType] === newFilter
    );

    setFilteredReports(newReports);
  };

  return (
    <div className="reports">
      <h3 className="reports-title">신고 목록</h3>
      <header className="reports-header">
        <div className="reports-header-left">페이지네이션 조절</div>
        <div className="reports-header-right">설정</div>
      </header>
      <main className="reports-main">
        <div className="reports-main-head">
          <div
            className="reports-header-reset"
            onClick={() => setFilteredReports(reports)}
          >
            전체
          </div>
          <div className="reports-main-unsolved">
            <span className="reports-main-unsolved-text">해결 안된 신고: </span>
            <span className="reports-main-unsolved-number">{unsolved}</span>
          </div>
        </div>
        <table className="reports-main-table">
          <thead className="reports-main-table-header">
            <tr className="reports-main-table-header-row">
              {Object.keys(reportsHeaders).map((header) => {
                const key =
                  reportsHeaders[`${header}` as keyof typeof reportsHeaders];
                return (
                  <th
                    data-sort="asc"
                    className="reports-main-table-header-cell"
                    id={key}
                    key={key}
                    onClick={(e) => handleSort(e)}
                  >
                    {header}
                    {sorts[key as keyof typeof sorts] === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="reports-main-table-body">
            {filteredReports.map((report) => (
              <tr
                className="reports-main-table-body-row"
                key={report.report_id}
              >
                <td
                  className="reports-main-table-body-cell selectable"
                  data-filter={report.report_cate}
                  id="report_cate"
                  onClick={(e) => handleFilter(e)}
                >
                  {reportName(report.report_cate)}
                </td>
                <td className="reports-main-table-body-cell">
                  {report.user_id}
                </td>
                <td className="reports-main-table-body-cell">
                  {report.reported_user_id}
                </td>
                <td className="reports-main-table-body-cell">
                  {report.msg_id || report.post_id}
                </td>
                <td className="reports-main-table-body-cell">
                  {report.report_detail && report.report_detail.length > 10
                    ? report.report_detail.slice(0, 10) + "..."
                    : report.report_detail}
                </td>
                <td className="reports-main-table-body-cell">
                  {dateFromLocalDateToDot(report.report_date)}
                </td>
                <td
                  className="reports-main-table-body-cell selectable"
                  data-filter={report.report_false}
                  id="report_false"
                  onClick={(e) => handleFilter(e)}
                >
                  {reportResult(report.report_false)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <div className="reports-search-container">검색</div>
      <div className="reports-pagination-container">페이징</div>
    </div>
  );
};

export default Reports;
