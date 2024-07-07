import React, { useState } from "react";
import "./testSearch.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { reportList, reportName } from "../../../data/reports";

export interface SearchProps {
  setKeyword: (value: string) => void;
  setSearch: (value: string | number) => void;
  keywordArray: { keyword: string; key: string }[];
  keyword: string;
}

const TestSearch = ({
  setKeyword,
  setSearch,
  keywordArray,
  keyword,
}: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("신고 유형을 골라주세요");
  const [openList, setOpenList] = useState(false);
  const [keywordTitle, setKeywordTitle] = useState(keywordArray[0].keyword);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value;

    setSearch(search);
  };

  const handleKeyword = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    keywordTitle: string
  ) => {
    const keyword = e.currentTarget.id;

    setKeyword(keyword);
    setKeywordTitle(keywordTitle);
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const reportCate = e.currentTarget.id;
    setSearch(reportCate);
    setCategory(reportName(reportCate));
    setOpenList(!openList);
  };

  return (
    <div className="search-container">
      <span className="keyword-list">
        <div
          className="keyword-list-keyword"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={
              isOpen ? "keyword-list-icon-active" : "keyword-list-icon"
            }
          >
            <LuChevronRight />
          </span>{" "}
          {keywordTitle}
        </div>

        <ul
          className={
            isOpen ? "keyword-list-container-active" : "keyword-list-container"
          }
        >
          {keywordArray.map((keyword, index) => (
            <li
              className="keyword-list-item"
              key={`keyword${index}`}
              id={keyword.key}
              onClick={(e) => handleKeyword(e, keyword.keyword)}
            >
              {keyword.keyword}
            </li>
          ))}
        </ul>
      </span>
      {keyword === "reportCate" && (
        <span className="test-search-searchlist">
          <p onClick={() => setOpenList(!openList)}>{category}</p>
          <ul
            className={
              openList
                ? "test-search-searchlist-container-active"
                : "test-search-searchlist-container"
            }
          >
            {Object.keys(reportList).map((reportCate) => (
              <li
                className="test-search-searchlist-item"
                key={reportCate}
                id={reportCate}
                onClick={(e) => handleSearch(e)}
              >
                {reportName(reportCate)}
              </li>
            ))}
          </ul>
        </span>
      )}
      {keyword !== "reportCate" && (
        <input
          id="search"
          type="search"
          placeholder="검색어를 적어주세요"
          style={{
            width: "50%",
            height: "clamp(40px, 2vw, 60px)",
            fontSize: "clamp(12px, 2vw, 16px)",
            paddingLeft: "5px",
          }}
          // autoFocus
          onChange={(e) => handleSearchChange(e)}
        />
      )}
    </div>
  );
};

export default TestSearch;
