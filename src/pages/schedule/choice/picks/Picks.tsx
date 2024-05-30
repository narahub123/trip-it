import React from "react";
import "./picks.css";
import Drags from "./Drags";
import Drops from "./Drops";

const Picks = () => {
  return (
    <div className="picks">
      <Drags />
      <Drops />
    </div>
  );
};

export default Picks;
