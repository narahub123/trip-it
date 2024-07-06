import React from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import "./testSortPanel.css";

export interface TestSortPanelProps {
  headers: any;
  sorts: any;
  setSorts: (value: any) => void;
  openSort: boolean;
  setOpenSort: (value: boolean) => void;
}

const TestSortPanel = ({
  headers,
  sorts,
  setSorts,
  openSort,
  setOpenSort,
}: TestSortPanelProps) => {
  const handleSort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
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
    <div className="test-sort-panel">
      <p onClick={() => setOpenSort(!openSort)}>정렬</p>
      <div className="wrap">
        <ul
          className={
            openSort
              ? "test-sort-panel-container-active"
              : "test-sort-panel-container"
          }
        >
          {Object.keys(headers).map((name) => {
            const key = headers[`${name}` as keyof typeof headers];
            return (
              <li
                key={key}
                data-sort="asc"
                className="test-sort-panel-cell"
                id={key}
                onClick={(e) => handleSort(e)}
              >
                <p>{name}</p>
                <p>
                  {Object.keys(sorts)[0] === key &&
                  sorts[Object.keys(sorts)[0]] === "desc" ? (
                    <LuChevronDown />
                  ) : (
                    <LuChevronUp />
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TestSortPanel;
