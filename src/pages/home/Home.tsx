import React, { useEffect, useState } from "react";
import "./home.css";

import HomeCard from "./HomeCard";
import { useDispatch, useSelector } from "react-redux";
import { filteredMetros } from "../../store/slices/metroSlice";
import { Rootstate } from "../../store/store";
import { resetSchedule } from "../../store/slices/scheduleSlice";
import { resetDates } from "../../store/slices/dateSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const metros = useSelector((state: Rootstate) => state.metro.filteredMetros);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const search = e.currentTarget.value;

    setSearch(search);
  };

  // 리덕스 초기화
  useEffect(() => {
    dispatch(resetSchedule());
    dispatch(resetDates());
  }, []);

  useEffect(() => {
    dispatch(filteredMetros(search));
  }, [search, dispatch]);

  return (
    <>
      <div className="home">
        <div className="home-search-container">
          <input
            id="search"
            type="search"
            placeholder="여행할 도시를 검색해주세요"
            style={{
              width: "50%",
              height: "clamp(40px, 2vw, 60px)",
              fontSize: "clamp(12px, 2vw, 16px)",
              paddingLeft: "5px",
              margin: "0 auto",
            }}
            autoFocus
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="home-list-container">
          {metros?.length === 0 ? (
            <>
              <div className="logo">
                <img src={`/images/trip-it-logo.png`} alt="" />
              </div>
              <p>검색결과가 없습니다.</p>
            </>
          ) : (
            <ul>
              {metros?.map((metro) => (
                <HomeCard key={metro.areaCode} metro={metro} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
