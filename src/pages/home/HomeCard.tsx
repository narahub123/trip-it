import React from "react";
import "./homeCard.css";
import { MetroType } from "../../types/schedules";
import { metros } from "../../data/metros";

interface HomeCardProps {
  metro: MetroType;
  setActive: (value: boolean) => void;
  setArea: (value: MetroType) => void;
}

const HomeCard = ({ metro, setActive, setArea }: HomeCardProps) => {
  const handleModal = (areaCode: string) => {
    const selectedArea = metros.find((metro) => metro.areaCode === areaCode);
    setActive(true);
    selectedArea && setArea(selectedArea);
  };
  return (
    <li
      key={metro.areaCode}
      onClick={() => handleModal(metro.areaCode)}
      className="homeCard"
    >
      <figure>
        <img src={metro.imgUrl} alt={metro.name} />
      </figure>
      <div>
        <p>{metro.name}</p>
      </div>
    </li>
  );
};

export default HomeCard;
