import React, { useState } from "react";
import "./search.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export interface SearchProps {
  array: any[];
  setArray: (value: any[]) => void;
  keywordArray: { keyword: string; key: string }[];
}

const Search = ({ array, setArray, keywordArray }: SearchProps) => {
  const [keyword, setKeyword] = useState(keywordArray[0]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(array);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value;

    let newArray = [];

    newArray = array.filter((item) => {
      return item[`${keyword.key}`].toString()?.includes(search);
    });

    console.log(newArray);

    setArray(newArray);
  };

  const handleKeyword = (keyword: { keyword: string; key: string }) => {
    console.log(keyword);
    setKeyword(keyword);
    setIsOpen(!isOpen);
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
          {keyword.keyword}
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
              onClick={() => handleKeyword(keyword)}
            >
              {keyword.keyword}
            </li>
          ))}
        </ul>
      </span>
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
        autoFocus
        onChange={(e) => handleSearchChange(e)}
      />
    </div>
  );
};

export default Search;
