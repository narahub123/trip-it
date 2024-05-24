import React, { useState } from "react";
import "./home.css";
import * as Hangul from "hangul-js";
import { metros } from "../../data/metros";
import { MetroType } from "../../types/schedules";
import HomeModal from "./HomeModal";
import HomeCard from "./HomeCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const [area, setArea] = useState<MetroType>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const search = e.currentTarget.value;

    setSearch(search);
  };

  const filteredMetros = metros.filter(
    (metro) => Hangul.search(metro.name, search) === 0
  );

  return (
    <>
      {active && area && <HomeModal area={area} setActive={setActive} />}
      <div className="home">
        <div className="home-search-container">
          <input
            id="search"
            type="search"
            placeholder="여행할 도시를 검색해주세요"
            style={{
              width: "450px",
              height: "50px",
              fontSize: "20px",
              paddingLeft: "5px",
            }}
            autoFocus
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="home-list-container">
          <ul>
            {filteredMetros.map((metro) => (
              <HomeCard
                key={metro.areaCode}
                metro={metro}
                setActive={setActive}
                setArea={setArea}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
