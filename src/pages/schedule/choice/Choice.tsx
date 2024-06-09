import React, { useEffect } from "react";
import "./choice.css";
import { useLocation } from "react-router-dom";
import Dates from "./dates/Dates";
import Places from "./places/Places";
import Picks from "./picks/Picks";
import { useDispatch } from "react-redux";
import { metros } from "../../../data/metros";
import { addAreaCode } from "../../../store/slices/scheduleSlice";

const Choice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { hash, pathname } = location;

  const encodedAreaName = pathname.split("/")[2];

  const areaname = decodeURIComponent(encodedAreaName);

  const areaCode = metros.find((metro) => metro.name === areaname)?.areaCode;

  useEffect(() => {
    if (areaCode) dispatch(addAreaCode(areaCode));
  }, []);

  return (
    <main className="choice">
      {hash === "#step1" && <Dates />}
      {(hash === "#step2" || hash === "#step3") && <Places />}
      {hash === "#step4" && <Picks />}
    </main>
  );
};

export default Choice;
