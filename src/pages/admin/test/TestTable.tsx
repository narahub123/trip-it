import "./testTable.css";
import { dateFromLocalDateToDot } from "../../../utils/date";
import { reportName, reportResult } from "../../../data/reports";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export interface TestTableProps {
  headers: { [key: string]: string };
  items: any[];
  sorts: any;
  setSorts: (value: any) => void;
}

const TestTable = ({ headers, items, sorts, setSorts }: TestTableProps) => {
  const handleSort = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => {
    const prop = e.currentTarget.id;
    const sort = e.currentTarget.dataset.sort;

    if (sort === "asc") {
      e.currentTarget.dataset.sort = "desc";
      setSorts({ [prop]: "desc" });
    } else {
      e.currentTarget.dataset.sort = "asc";
      setSorts({ [prop]: "asc" });
    }
  };
  return (
    <table className="template-main-table">
      <thead className="template-main-table-head">
        <tr className="template-main-table-head-row">
          {Object.keys(headers).map((name) => {
            const key = headers[`${name}` as keyof typeof headers];
            return (
              <th
                key={key}
                data-sort="asc"
                className="template-main-table-head-cell"
                id={key}
                onClick={(e) => handleSort(e)}
              >
                <div className="template-main-table-head-cell-container">
                  <p>{name}</p>
                  <p>
                    {Object.keys(sorts)[0] === key &&
                    sorts[Object.keys(sorts)[0]] === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </p>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="template-main-table-body">
        {items.map((item) => (
          <tr className="template-main-table-body-row" key={item.reportId}>
            <td className="template-main-table-body-cell">
              {reportName(item.reportCate)}
            </td>
            <td className="template-main-table-body-cell">
              {typeof item.userId === "number"
                ? item.userId
                : item.userId.length > 10
                ? item.userId.slice(0, 10) + "..."
                : item.userId}
            </td>
            <td className="template-main-table-body-cell">
              {item.reportedUserId}
            </td>
            <td className="template-main-table-body-cell">
              {item.msgId || item.postId}
            </td>
            <td className="template-main-table-body-cell">
              {item.reportDetail.length > 10
                ? item.reportDetail.slice(0, 10) + "..."
                : item.reportDetail}
            </td>
            <td className="template-main-table-body-cell">
              {dateFromLocalDateToDot(item.reportDate)}
            </td>
            <td className="template-main-table-body-cell">
              {reportResult(item.reportFalse)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestTable;
