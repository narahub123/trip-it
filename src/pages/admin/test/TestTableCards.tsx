import "./testTableCards.css";
import { reportName, reportResult } from "../../../data/reports";
import { dateFromLocalDateToDot } from "../../../utils/date";

export interface TestTableCards {
  items: any[];
  limit: number;
  offset: number;
}
const TestTableCards = ({ items, limit, offset }: TestTableCards) => {
  return (
    <ul className="template-main-tables-container">
      {items.slice(offset, offset + limit).map((item) => (
        <table
          className="template-main-tables-table"
          key={item.reportId}
          data-sort="asc"
        >
          <tbody className="template-main-tables-body">
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">신고 유형</th>
              <td className="template-main-tables-body-cell">
                {reportName(item.reportCate)}
              </td>
            </tr>
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">신고자</th>
              <td className="template-main-tables-body-cell">
                {typeof item.userId === "number"
                  ? item.userId
                  : item.userId.length > 10
                  ? item.userId.slice(0, 10) + "..."
                  : item.userId}
              </td>
            </tr>
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">
                신고 대상자
              </th>
              <td className="template-main-tables-body-cell">
                {typeof item.reportedUserId === "number"
                  ? item.reportedUserId
                  : item.reportedUserId.length > 10
                  ? item.reportedUserId.slice(0, 10) + "..."
                  : item.reportedUserId}
              </td>
            </tr>
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">신고글</th>
              <td className="template-main-tables-body-cell">
                {item.msgId || item.postId}
              </td>
            </tr>
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">신고 상세</th>
              <td className="template-main-table-body-cell">
                {item.reportDetail.length > 10
                  ? item.reportDetail.slice(0, 10)
                  : item.reportDetail}
              </td>
            </tr>
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">신고일</th>
              <td className="template-main-table-body-cell">
                {dateFromLocalDateToDot(item.reportDate)}
              </td>
            </tr>
            <tr className="template-main-tables-body-row">
              <th className="template-main-tables-body-highlight">처리결과</th>
              <td className="template-main-table-body-cell">
                {reportResult(item.reportFalse)}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </ul>
  );
};

export default TestTableCards;
