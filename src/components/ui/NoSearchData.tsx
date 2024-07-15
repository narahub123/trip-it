import React from "react";
import "./noSearchData.css";

const NoSearchData = () => {
  return (
    <td className="no-search-data" colSpan={5}>
      <img src="/images/trip-it-logo.png" alt="" />
      <p>검색 결과가 없습니다.</p>
    </td>
  );
};

export default NoSearchData;
