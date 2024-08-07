import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import {
  reportName,
  reportResult,
  reportsHeaders,
} from "../../../data/reports";

import { ReportTestType, ReportType } from "../../../types/reports";
import { dateFromLocalDateToDot } from "../../../utils/date";
import "./reports.css";
import { useEffect, useState } from "react";
import PaginationControllerFlexible from "../../../components/ui/PaginationControllerFlexible";
import Pagination from "../../../components/ui/Pagination";
import Search from "../../../components/ui/Search";
import NoSearchData from "../../../components/ui/NoSearchData";
import { Link } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import {
  GetAllReportsForAdminAPI,
  updateReportAPI,
} from "../../../apis/reports";
import { useDispatch, useSelector } from "react-redux";
import { setReports } from "../../../store/slices/returnSlice";
import { Rootstate } from "../../../store/store";

const ReportsNode = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state: Rootstate) => state.return.reports);
  const arrayLengthDefault = 5;
  const arrayLengthMax = 10;
  const arrayLengthMin = 1;
  const UNIT_NAME = "신고";
  const [size, setSize] = useState(arrayLengthDefault);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * size;

  const [filteredReports, setFilteredReports] = useState<ReportTestType[]>([]);

  const unsolved = filteredReports.filter(
    (report) => report.reportFalse === 0
  ).length;

  const [sorts, setSorts] = useState({
    _id: "desc",
    userId: "desc",
    reportedUserId: "desc",
    postId: "desc",
    reportDetail: "desc",
    reportDate: "desc",
    reportFalse: "desc",
  });

  // 신고 불러오기
  useEffect(() => {
    GetAllReportsForAdminAPI()
      .then((res) => {
        dispatch(setReports(res.data));
        setFilteredReports(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // 신고 상세 창 띄우기
  const [detail, setDetail] = useState<string>("");
  // 신고 상세 오픈
  const [isOpen, setIsOpen] = useState(false);
  // 신고 오픈
  const [open, setOpen] = useState<{ isOn: boolean; id: string }>({
    isOn: false,
    id: "",
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
    e: React.MouseEvent<HTMLTableDataCellElement | HTMLElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    const filter = e.currentTarget.dataset.filter;

    console.log(id);
    console.log(filter);

    const newFilter = id === "reportFalse" ? Number(filter) : filter;

    const newReports = filteredReports.filter(
      (report) => report[id as keyof ReportTestType] === newFilter
    );

    console.log(newReports);

    setFilteredReports(newReports);
  };

  // 검색
  const keywordArray = [
    { keyword: "아이디", key: "userId" },
    { keyword: "신고 상세", key: "reportDetail" },
  ];

  // 신고 상세 보기
  const handleDeatil = (reportDetail: string | undefined) => {
    console.log(detail);
    if (reportDetail) {
      setDetail(reportDetail);
      setIsOpen(true);
    }
  };

  // 신고 dropdown 열기
  const handleOpen = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setOpen({
      id,
      isOn: !open.isOn,
    });
  };
  // 신고 처리하기
  const handleReport = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    reportId: string
  ) => {
    e.stopPropagation();
    if (!window.confirm("신고를 처리하시겠습니까?")) {
      setOpen({
        ...open,
        isOn: !open.isOn,
      });

      return;
    }

    const reportFalse = Number(e.currentTarget.dataset.report);
    console.log(reportFalse);

    updateReportAPI(reportId, reportFalse)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        return;
      });

    const newReports = filteredReports.map((report) => {
      if (report._id === reportId) {
        return {
          ...report,
          reportFalse: reportFalse,
        };
      } else {
        return { ...report };
      }
    });

    setOpen({
      ...open,
      isOn: !open.isOn,
    });
    setFilteredReports(newReports);
    dispatch(setReports(newReports));
  };

  console.log(filteredReports);

  return (
    <div className="reports">
      <h3 className="reports-title">신고 목록</h3>
      <header className="reports-header">
        <div className="reports-header-left">
          <div
            className="reports-header-reset"
            onClick={() => setFilteredReports(reports)}
          >
            전체
          </div>
          <PaginationControllerFlexible
            arrayLengthDefault={arrayLengthDefault}
            arrayLengthMax={arrayLengthMax}
            arrayLengthMin={arrayLengthMin}
            size={size}
            setSize={setSize}
            UNIT_NAME={UNIT_NAME}
          />
        </div>
        <div className="reports-header-right">
          <div className="reports-main-unsolved">
            <span className="reports-main-unsolved-text">해결 안된 신고: </span>
            <span
              className="reports-main-unsolved-number"
              data-filter={"0"}
              id="reportFalse"
              onClick={(e) => handleFilter(e)}
            >
              {unsolved}
            </span>
          </div>
          설정
        </div>
      </header>
      <main className="reports-main">
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
            {filteredReports.length === 0 && (
              <tr className="reports-main-table-body-row">
                <td className="reports-main-table-body-cell" colSpan={7}>
                  <NoSearchData />
                </td>
              </tr>
            )}
            {filteredReports.slice(offset, offset + size).map((report) => (
              <tr className="reports-main-table-body-row" key={report._id}>
                <td
                  className="reports-main-table-body-cell selectable"
                  data-filter={report._id}
                  id="_id"
                  onClick={(e) => handleFilter(e)}
                >
                  {reportName(report.reportCate)}
                </td>
                <td className="reports-main-table-body-cell">
                  <Link to={`/admin/users/${report.userId}`}>
                    {report.userId}
                  </Link>
                </td>
                <td className="reports-main-table-body-cell">
                  <Link to={`/admin/users/${report.reportedUserId}`}>
                    {report.reportedUserId}
                  </Link>
                </td>
                <td className="reports-main-table-body-cell">
                  <Link
                    to={report.msgId ? `.` : `/admin/posts/${report.postId}`}
                  >
                    {report.msgId || report.postId}
                  </Link>
                </td>
                <td
                  className="reports-main-table-body-cell"
                  onClick={() => handleDeatil(report.reportDetail)}
                  style={
                    report.reportDetail?.length !== 0
                      ? { cursor: "pointer" }
                      : {}
                  }
                >
                  {report.reportDetail && report.reportDetail.length > 10
                    ? report.reportDetail.slice(0, 10) + "..."
                    : report.reportDetail}
                </td>
                <td className="reports-main-table-body-cell">
                  {dateFromLocalDateToDot(report.reportDate)}
                </td>
                <td
                  className="reports-main-table-body-cell selectable"
                  data-filter={report.reportFalse}
                  id="reportFalse"
                  onClick={(e) => handleFilter(e)}
                >
                  {report.reportFalse === 0 ? (
                    <div className="reports-main-table-body-cell-container">
                      {reportResult(report.reportFalse)}{" "}
                      <p onClick={(e) => handleOpen(e, report._id)}>처리</p>
                      <ul
                        className={
                          open.isOn && report._id === open.id
                            ? "reports-dropdown-container-active"
                            : "reports-dropdown-container"
                        }
                      >
                        <li
                          className="reports-dropdown-item"
                          data-report="1"
                          onClick={(e) => handleReport(e, report._id)}
                        >
                          신고승인
                        </li>
                        <li
                          className="reports-dropdown-item"
                          data-report="2"
                          onClick={(e) => handleReport(e, report._id)}
                        >
                          허위신고
                        </li>
                      </ul>
                    </div>
                  ) : (
                    reportResult(report.reportFalse)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <div
        className={
          isOpen
            ? "reports-detail-container-active"
            : "reports-detail-container"
        }
      >
        <figure
          onClick={() => {
            setIsOpen(false);
            setDetail("");
          }}
        >
          <FaRegWindowClose />
        </figure>
        <p>{detail}</p>
      </div>
      <section className="reports-search-container">
        <Search
          array={reports}
          setArray={setFilteredReports}
          keywordArray={keywordArray}
        />
      </section>
      <div className="reports-pagination-container">
        <Pagination
          total={filteredReports.length}
          size={size}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ReportsNode;
