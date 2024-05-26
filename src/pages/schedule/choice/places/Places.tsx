import React from "react";
import "./places.css";
import SelectedPlacesList from "./SelectedPlacesList";
import PlacesList from "./PlacesList";

const Places = () => {
  return (
    <div className="places">
      <PlacesList />
      <SelectedPlacesList />
    </div>
  );
};

export default Places;
