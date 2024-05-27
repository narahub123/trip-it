import React from "react";
import "./choice.css";
import { useLocation } from "react-router-dom";
import Dates from "./dates/Dates";
import Places from "./places/Places";
import Picks from "./picks/Picks";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../store/store";
import PlaceModal from "./places/PlaceModal";

const Choice = () => {
  const location = useLocation();
  const { hash } = location;

  return (
    <main className="choice">
      {hash === "#step1" && <Dates />}
      {(hash === "#step2" || hash === "#step3") && <Places />}
      {hash === "#step4" && <Picks />}
    </main>
  );
};

export default Choice;
